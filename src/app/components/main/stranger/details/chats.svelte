<script>
import {onDestroy} from 'svelte';
import {ChatsListAPI} from '../../../../api/providers/app/chat/ChatsListAPI'
import {selected_stranger} from '../../../../stores/selected_strager';
import {formatDate} from "../../../../../lib/Date";
import {Unsubscriby} from "sickspack/unsubscriby";
import {_lang} from "sickspack/multilang/lang";
import Lang from "sickspack/multilang/Lang.svelte";


const unsbuscribe = new Unsubscriby(onDestroy);

let chats = [];

unsbuscribe.add = selected_stranger.subscribe(async (user) =>
{
	if($selected_stranger.id)
	{
		const result = await ChatsListAPI.userChats($selected_stranger.id).get();
		chats = result.docs.map(d => d.data());
	}
});

</script>

<div class="">
	{#each chats as chat}
	<div class="card-panel">
		<div class="row no-margin">
			<div class="col s8">
				<div class="flow-text">{chat.subject}</div>
				<p>
					<Lang key="app.chat.status.{chat.status.get()}"/>
					<Lang key="app.chat.state.{chat.state.get()}"/>
				</p>
				<p>{formatDate(chat.date.startedAt)}</p>
			</div>
			<div class="col s4 right-align">
				<div class="">{chat.messagesAmount} <Lang key="app.stranger.details.chats.item.msgs"/></div>
			</div>
		</div>
	</div>
	{:else}
	<p class="flow-text center-align">
		<Lang key="app.stranger.details.chats.placeholder"/>
	</p>
	{/each}
</div>