<script context="module">
import {ChatsListAPI} from '../../../../app/api/providers/app/chat/ChatsListAPI'

export async function preload(page, session)
{
	const chatId = page.params.chat_id;

	const chat = (await ChatsListAPI.chat(chatId).get()).data();

	if(!chat) {
		this.redirect(301, '/not_found');
	}

	return {
		chatId: page.params.chat_id,
		activeChat: chat
	};
}

</script>

<script>
import {onMount, onDestroy} from 'svelte';
import {writable} from 'svelte/store';
import {ChatModel as ChatModel} from '../../../../app/api/providers/common/models/firebase/ChatModel'
import Chat from '../../../../app/components/main/user/Chat.svelte'
import { active_chat, active_chat_changed } from '../../../../app/stores/user/active_chat';
import {Unsubscriby} from "sickspack/unsubscriby";
import { stores } from '@sapper/app';
import Metadata from "../../../../app/components/general/Metadata.svelte";

export let activeChat;

active_chat.set(activeChat);

const {page} = stores();

const unsubscriber = new Unsubscriby(onDestroy);

unsubscriber.add = page.subscribe(async (page) =>
{
	active_chat_changed.set(true);

	unsubscriber.stop('active_chat');
	unsubscriber.addSingle(() =>
	{
		return ChatsListAPI.chat(page.params.chat_id).listen((doc) =>
		{
			active_chat_changed.set(false);
			active_chat.set(doc.data());
		});
	}, 'active_chat');
});

</script>

<Metadata page="chat.active" data="{{xsubject: $active_chat.subject || '...'}}"/>

<div class="container">
	<Chat chat="{$active_chat}"/>
</div>