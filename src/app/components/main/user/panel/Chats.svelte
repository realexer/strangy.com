<script>

import { onMount, onDestroy} from 'svelte';
import { writable } from "svelte/store";
import { ChatsListAPI} from '../../../../api/providers/app/chat/ChatsListAPI';
import { ChatModel } from '../../../../api/providers/common/models/firebase/ChatModel'
import { UserModel } from '../../../../api/providers/common/models/firebase/UserModel'

import { current_user } from '../../../../stores/current_user';
import { user_chats, user_chats_stranger } from '../../../../stores/user/chats';
import { active_chat } from '../../../../stores/user/active_chat';
import {new_messages, new_invitations, NotificationsCounter} from '../../../../stores/user/notifications';
import {UsersListAPI} from "../../../../api/providers/app/Users";
import {lang_url} from "../../../general/link";
import {ChatState, ChatStatus} from "../../../../api/providers/common/chats";
import {_lang} from "sickspack/multilang/lang";
import Lang from "sickspack/multilang/Lang.svelte";
import {Unsubscriby} from "sickspack/unsubscriby";

let unsubscriber = new Unsubscriby(onDestroy);

let invitations = [];
let activeChats = [];
let closedChats = [];

let chatStrangerIdsStore = writable([]);
let chatStrangerIds = [];
let chatStrangers = {};

let unsubscribeChatStrangers = null;

onMount(() =>
{
  unsubscriber.add = current_user.subscribe((currentUser) =>
  {
    if($current_user.id) {

    	unsubscriber.add = ChatsListAPI.userChats($current_user.id).subscribe((result) =>
			{
				user_chats.set(result.docs.map(doc => doc.data()));

				//console.log(userChats);
			});

    }
  });

  unsubscriber.add = user_chats.subscribe((chats) =>
  {
    if(chats instanceof Array)
    {
      let allChats = chats.sort((a, b) => {
        if(a.lastMessageAt && b.lastMessageAt) {
          return b.lastMessageAt.toDate().getTime() - a.lastMessageAt.toDate().getTime();
        }

        return -1;
      });

      allChats.forEach((chat) => {
      	chatStrangers[chat.users.stranger($current_user.id)] = new UserModel();
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
            .reduce((sum, val) => sum + val, 0));
      }

      $chatStrangerIdsStore = allChats.map((chat) => chat.users.stranger($current_user.id));

      console.log(`New messages amount: ${$new_messages.amount}`);
    }
  });

  unsubscriber.add = chatStrangerIdsStore.subscribe((ids) =>
  {
    if(ids.length !== ids.filter(x => chatStrangerIds.includes(x)))
    {
      unsubscriber.stop('user_chats_strangers');

      chatStrangerIds = ids;

      if(chatStrangerIds.length > 0)
      {
        unsubscriber.addSingle(() =>
        {
        	return UsersListAPI.usersById(chatStrangerIds).subscribe((results) =>
					{
						chatStrangers = results.docs.reduce((all, d) => {
							all[d.id] = d.data();
							return all;
						}, {});
					});
        }, 'user_chats_stranger');
      }
    }
  });
});

const resolveStranger = (chat) =>
{
  return chatStrangers[chat.users.stranger($current_user.id)];
};

</script>

{#if invitations.length > 0}
<ul class="collection with-header">
  <li class="collection-header">
  	<h4 class="flow-text">
  		<Lang key="app.user_chats.invitations.heading" data="{{ amount: invitations.length }}"/>
		</h4>
	</li>
  {#each invitations as chat}
  <li class="collection-item">
    <h5 class="">
      <a href="{lang_url(`chat/${chat.id}`)}">{chat.subject}</a>
    </h5>

    {#if chatStrangers[chat.users.stranger($current_user.id)]}
      <div class="">
      	<Lang key="app.user_chats.invitations.item.from"/>: {resolveStranger(chat).tags.primary.string}
			</div>
    {/if}

  </li>
  {/each}
</ul>
{/if}

<ul class="collection with-header">
    <li class="collection-header">
    	<h4 class="flow-text">
    		<Lang key="app.user_chats.active.heading" data="{{ amount: activeChats.length }}"/>
			</h4>
		</li>
    {#each activeChats as chat}
    <li class="collection-item">
      <h5 class="">
        <a href="{lang_url('chat/'+chat.id)}">{chat.subject}</a>
        {#if chatStrangers[chat.users.stranger($current_user.id)].isActive === true}
        <span class="secondary-content">
          <i class="tiny material-icons" data-icon="wb_sunny"></i>
        </span>
        {/if}
      </h5>
      {#if (chat.state === ChatState.INVITATION)}
      <div class=""><Lang key="app.user_chats.active.item.not_accepted_yet"/></div>
      {/if}
      {#if (chat.getNewMessagesAmountForUser($current_user.id) > 0)}
      	<b>
      		<Lang key="app.user_chats.active.item.new_messages" data="{{ amount: chat.getNewMessagesAmountForUser($current_user.id)}}"/>
				</b>
      {/if}
      <div class="_debug">Participants: {chat.users.all.join(', ')}</div>
      {#if chatStrangers[chat.users.stranger($current_user.id)].id}
      <div class="">
      	<Lang key="app.user_chats.active.item.with"/>: {resolveStranger(chat).tags.primary.string}
			</div>
      {/if}
    </li>
    {:else}
    <li class="collection-item text-lighten-3">
     	<Lang key="app.user_chats.active.placeholder"/>
		</li>
    {/each}
</ul>