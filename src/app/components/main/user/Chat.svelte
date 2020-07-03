<script>

import {onMount, onDestroy} from 'svelte'
import {current_user} from '../../../stores/current_user'
import {active_chat, active_chat_stranger} from '../../../stores/user/active_chat'

import {UsersListAPI} from '../../../api/providers/app/Users'
import {UserModel} from '../../../api/providers/common/models/UserModel'

import MessageForm from './chat/message_form.svelte'
import MessagesList from './chat/messages_list.svelte'
import Header from './chat/header.svelte'

export let chat = null;
let unsubscribe = null;
let listenToStranger = null;

onMount(() =>
{
  unsubscribe = active_chat.subscribe((activeChat) =>
  {
    if(activeChat && activeChat.id)
    {
      if(listenToStranger !== null && chat.id !== activeChat.id) {
        listenToStranger();
        listenToStranger = null;
      }

      chat = activeChat;

      if(listenToStranger === null)
      {
        listenToStranger = UsersListAPI.byId(chat.users.stranger($current_user.id)).subscribe((doc) =>
        {
          $active_chat_stranger = UserModel.fromDoc(doc);
        });
      }
    }
  });
});

onDestroy(() =>
{
	if(unsubscribe) {
		unsubscribe();
	}

	if(listenToStranger) {
		listenToStranger();
	}
})

</script>

{#if ($active_chat.id)}
<Header/>
<MessagesList/>
<MessageForm/>

{/if}