<script>

import {onMount, onDestroy} from 'svelte'
import {current_user} from '../../../stores/current_user'
import {active_chat, active_chat_stranger} from '../../../stores/user/active_chat'

import {UsersListAPI} from '../../../api/providers/app/Users'
import {UserModel} from '../../../api/providers/common/models/firebase/UserModel'

import MessageForm from './chat/message_form.svelte'
import MessagesList from './chat/messages_list.svelte'
import Header from './chat/header.svelte';
import {Unsubscriby} from "sickspack/unsubscriby";

export let chat = null;

let unsubscribe = new Unsubscriby(onDestroy);
let listenToStranger = null;

$: if($active_chat.id && $current_user.id)
{
	if(unsubscribe.getIdByName('ActiveChatSranger') !== $active_chat.id) {
		unsubscribe.stop('ActiveChatSranger');
	}

	unsubscribe.addSingle(() => {
		return UsersListAPI.byId(chat.users.stranger($current_user.id)).subscribe((doc) =>
		{
			$active_chat_stranger = doc.data();
		})
	}, 'ActiveChatSranger', $active_chat.id);

}

</script>

{#if ($active_chat.id)}
<Header/>
<MessagesList/>
<MessageForm/>

{/if}