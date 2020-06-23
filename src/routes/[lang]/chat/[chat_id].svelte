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
import {ChatsListAPI} from '../../../app/api/Chats'
import {ChatModel as ChatModel} from '../../../app/api/models/ChatModel'
import Chat from '../../../app/components/main/user/Chat.svelte'

import { active_chat } from '../../../app/stores/user/active_chat';
import {UnsubscriberX} from "../../../lib/UnsubscriberX";

export let chatId;

let unsubscribe = new UnsubscriberX();

let listenToChatChanges = (chatId) =>
{
	return ChatsListAPI.chat(chatId).listen((doc) =>
	{
		$active_chat = ChatModel.fromDoc(doc);
	});
};

$: if(chatId) {
	unsubscribe.finish();
	unsubscribe.add = listenToChatChanges(chatId);
}

onMount(() =>
{

});

onDestroy(() =>
{
	unsubscribe.finish();
})

</script>

<div class="container">
	<Chat chat="{$active_chat}"/>
</div>