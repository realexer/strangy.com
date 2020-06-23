<script>

import { onMount, onDestroy} from 'svelte';
import { writable } from "svelte/store";
import { ChatsListAPI, ChatOperationsAPI, ChatState, ChatStatus } from '../../../../api/Chats';
import { ChatModel } from '../../../../api/models/ChatModel'
import { UserModel } from '../../../../api/models/UserModel'

import { current_user } from '../../../../stores/current_user';
import { user_chats, user_chats_stranger } from '../../../../stores/user/chats';
import { active_chat } from '../../../../stores/user/active_chat';
import {new_messages, new_invitations, NotificationsCounter} from '../../../../stores/user/notifications';
import {UsersListAPI} from "../../../../api/Users";
import {lang_url} from "../../../general/link";

let invitations = [];
let activeChats = [];
let closedChats = [];

let chatStrangerIdsStore = writable([]);
let chatStrangerIds = [];
let chatStrangers = {};

let unsubscribeCurrentUser = null;
let unsubscribeUserChats = null;
let unsubscribeChatStrangers = null;

onMount(() =>
{
  unsubscribeCurrentUser = current_user.subscribe((currentUser) =>
  {
    if($current_user.id) {
      loadChats();
    }
  });

  unsubscribeUserChats = user_chats.subscribe((chats) =>
  {
    if(chats && chats instanceof Array)
    {
      let allChats = chats.sort((a, b) => {
        if(a.lastMessageAt && b.lastMessageAt) {
          return b.lastMessageAt.toDate().getTime() - a.lastMessageAt.toDate().getTime();
        }

        return -1;
      });

      invitations = allChats.filter((chat) => {
        return chat.state.isWaitingResponse() && chat.state.isInvitation($current_user.id).received;
      });

      activeChats = allChats.filter((chat) => invitations.indexOf(chat) === -1);

      // activeChats = allChats.filter((chat) => {
      //   return (chat.state.isInvitation($current_user.id).received === false && chat.status.isActive);
      // });

      $new_invitations = new NotificationsCounter(invitations.length);

      $new_messages = new NotificationsCounter(0);

      if(activeChats.length > 0)
      {
        $new_messages = new NotificationsCounter(
            activeChats
            .map(chat => chat.getNewMessagesAmountForUser($current_user.id))
            .reduce((sum, val) => sum + val));
      }

      $chatStrangerIdsStore = allChats.map((chat) => chat.users.stranger($current_user.id));

      console.log(`New messages amount: ${$new_messages.amount}`);
    }
  });

  chatStrangerIdsStore.subscribe((ids) =>
  {
    if(ids.length !== ids.filter(x => chatStrangerIds.includes(x))) {
      if(unsubscribeChatStrangers) {
        unsubscribeChatStrangers();
      }

      chatStrangerIds = ids;

      if(chatStrangerIds.length > 0)
      {
        unsubscribeChatStrangers = UsersListAPI.usersById(chatStrangerIds).subscribe((results) =>
        {
          chatStrangers = {};

          results.docs.forEach((doc) => {

            const user = UserModel.fromDoc(doc);
            chatStrangers[user.id] = user;
          })
        });
      }
    }
  });
});

const loadChats = async () =>
{
  ChatsListAPI.userChats($current_user.id).subscribe((result) =>
  {
    const chats = [];

    const chatsPreparations = [];

    result.docs.forEach((doc) =>
    {
      chats.push(ChatModel.fromDoc(doc));
    });

    Promise.all(chatsPreparations).then(() => {
      user_chats.set(chats);
    });

    //console.log(userChats);
  });
};

const resolveStranger = (chat) =>
{
  let strangerId = chat.users.stranger($current_user.id);

  return chatStrangers[strangerId] || new UserModel();
};

onDestroy(() => {
	if(unsubscribeCurrentUser) {
		unsubscribeCurrentUser();
	}
});

</script>

{#if invitations.length > 0}
<ul class="collection with-header">
  <li class="collection-header"><h4>{invitations.length} invitations</h4></li>
  {#each invitations as chat}
  <li class="collection-item">
    <h5 class="">
      <a href="{lang_url('chat/'+chat.id)}">{chat.subject}</a>
    </h5>

    {#if chatStrangers[chat.users.stranger($current_user.id)]}
      <div class="">with: {resolveStranger(chat).tags.primary.string}</div>
    {/if}

  </li>
  {/each}
</ul>
{/if}

<ul class="collection with-header">
    <li class="collection-header"><h4>Active chats</h4></li>
    {#each activeChats as chat}
    <li class="collection-item">
      <h5 class="">
        <a href="{lang_url('chat/'+chat.id)}">{chat.subject}</a>
        {#if chat.users.stranger($current_user.id).is_active === true}
        <span class="secondary-content">
          <i class="tiny material-icons">wb_sunny</i>
        </span>
        {/if}
      </h5>
      {#if (chat.state === ChatState.INVITATION)}
      <div class="">not accepted yet</div>
      {/if}
      {#if (chat.getNewMessagesAmountForUser($current_user.id) > 0)}
      <b>{chat.getNewMessagesAmountForUser($current_user.id)} new messages</b>
      {/if}
      <div class="_debug">Participants: {chat.users.all.join(', ')}</div>
      {#if chatStrangers[chat.users.stranger($current_user.id)]}
      <div class="">with: {resolveStranger(chat).tags.primary.string}</div>
      {/if}
    </li>
    {:else}
    <li class="collection-item text-lighten-3"> no active chats</li>
    {/each}
</ul>