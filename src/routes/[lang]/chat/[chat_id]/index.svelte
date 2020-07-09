<script context="module">

export async function preload(page, session)
{
	return {
		chatId: page.params.chat_id
	};
}

</script>

<script>
import {onMount, onDestroy} from 'svelte';
import {writable} from 'svelte/store';
import {ChatsListAPI} from '../../../../app/api/providers/app/chat/ChatsListAPI'
import {ChatModel as ChatModel} from '../../../../app/api/providers/common/models/firebase/ChatModel'
import Chat from '../../../../app/components/main/user/Chat.svelte'
import { active_chat } from '../../../../app/stores/user/active_chat';
import {Unsubscriby} from "sickspack/unsubscriby";
import { stores } from '@sapper/app';

const {page} = stores();

const unsubscriber = new Unsubscriby(onDestroy);

unsubscriber.add = page.subscribe(async (page) =>
{
	unsubscriber.stop('active_chat');
	unsubscriber.addSingle(() =>
	{
		return ChatsListAPI.chat(page.params.chat_id).listen((doc) =>
		{
			$active_chat = doc.data();
		});
	}, 'active_chat');
});

</script>

<div class="container">
	<Chat chat="{$active_chat}"/>
</div>