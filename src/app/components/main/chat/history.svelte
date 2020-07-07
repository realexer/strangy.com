<script>
import {writable} from 'svelte/store';
import {ChatMessagesAPI} from "../../../api/providers/app/chat/ChatMessagesAPI";
import {selected_chat} from "../../../stores/selected_chat";
import Message from './message.svelte';
import {UsersListAPI} from "../../../api/providers/app/Users";

// TODO: reimplement pagination using admin sdk https://fireship.io/lessons/firestore-pagination-guide/
class Pagination
{
	constructor()
	{

	}

	paginate(total, step)
	{
		const pages = [];
		for(let i = 0, p = 1; i < total; p++, i+=step) {
			pages.push({
				page: p,
				offset: i
			});
		}


		return pages;
	}
}

const messagesPerPage = 1;
let startAt = 0;
let messages = [];
let pagination = new Pagination();

let chatUsers = writable({
	starter: null,
	invited: null
});

const loadMessages = async (offset) =>
{
  const result = (await ChatMessagesAPI.instance($selected_chat.id).messages().get(messagesPerPage, offset));
  messages = result.docs.map(d => d.data());
};

selected_chat.subscribe(async () =>
{
	if($selected_chat.id) {
		await loadMessages(0);

		$chatUsers.starter = (await UsersListAPI.byId($selected_chat.users.starter).get()).data();
		$chatUsers.invited = (await UsersListAPI.byId($selected_chat.users.invited).get()).data();
	}
});

</script>
{#if $selected_chat.id}
<div class="center-align">
	<h3>{$selected_chat.subject}</h3>
	<p>{$selected_chat.messagesAmount} msg/s</p>
	{#if $chatUsers.invited && $chatUsers.starter}
		<a href="/user/{$chatUsers.invited.id}">{$chatUsers.invited.tags.primary.string}</a>
		invited by
		<a href="/user/{$chatUsers.starter.id}">{$chatUsers.starter.tags.primary.string}</a>
	{/if}
</div>

{#if $selected_chat.messagesAmount > 0}
<div class="">
{#each messages as msg}
	<Message viewerId="{$selected_chat.users.starter}" msg="{msg}"/>
{/each}
</div>

{#each pagination.paginate($selected_chat.messagesAmount, messagesPerPage) as page}
	<a href="#!" on:click|preventDefault="{loadMessages(page.offset)}">{page.page}</a>
{/each}

{:else}
<div class="">
	No messages
</div>
{/if}
{/if}