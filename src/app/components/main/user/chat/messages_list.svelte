<script>

import {onMount, onDestroy} from 'svelte'
import {ChatMessagesAPI} from '../../../../api/providers/app/chat/ChatMessagesAPI'
import {active_chat} from '../../../../stores/user/active_chat'
import {current_user} from '../../../../stores/current_user'
import {ChatModel as chat} from "../../../../api/providers/common/models/firebase/ChatModel";
import {UnsubscriberX} from "../../../../../lib/UnsubscriberX";
import ApiClient from "../../../../api/client";
import ChatMessage from '../../chat/message.svelte'

let unsubscribes = new UnsubscriberX(onDestroy);

let currentChatId = null;

let messages = [];

let subscribeToNewMessagesAfter = 0;
let lastLoadedMessageAt = 0;
let loadedMessageIds = [];

const reset = () =>
{
  messages = [];
  loadedMessageIds = [];
  subscribeToNewMessagesAfter = 0;
  lastLoadedMessageAt = 0;

  unsubscribes.stop('messages');
};

const loadMessages = (chatId) =>
{
  return ChatMessagesAPI.instance(chatId).messages().get(10)
  .then((result) =>
  {
    messages = [];

    processMessages(result.docs);

    messages = messages.reverse();
  })
  .catch((e) => {

  });
};

const pushMessage = (msg) =>
{
  if(msg.sent_at > subscribeToNewMessagesAfter) {
    subscribeToNewMessagesAfter = msg.sent_at;
  }

  if(msg.sent_at > lastLoadedMessageAt) {
    lastLoadedMessageAt = msg.sent_at;
  }

  messages = [...messages, msg];
  loadedMessageIds.push(msg.id);
};

/**
*
* @param {ChatModel} chat
*/
const listenToMessages = (chatId) =>
{
  return ChatMessagesAPI.instance(chatId).messages().subscribe({
    args: [subscribeToNewMessagesAfter],
    func: (result) =>
    {
      processMessages(result.docs);
    }
  });
};

const processMessages = async (docs) =>
{
  docs.forEach((doc) =>
  {
    const msg = doc.data();

    if(loadedMessageIds.indexOf(msg.id) === -1) {
      pushMessage(msg);
    }
  });

  if(lastLoadedMessageAt.seconds > $active_chat.getLastReadMessageAtForUser($current_user.id).seconds)
  {
  	console.log(`LastLoadedMessageAt is bigger than lastReadMessageAtForUser`);

  	await ApiClient.chat($active_chat.id).messages.processNew(lastLoadedMessageAt);
  }
};

onMount(() =>
{
  console.log('Messages list mounted.');

  unsubscribes.add = active_chat.subscribe((value) =>
  {
  	if(currentChatId != $active_chat.id)
  	{
  		reset();

  		loadMessages($active_chat.id).then(() =>
  		{
  			unsubscribes.addNamed(listenToMessages($active_chat.id), 'messages');
  		});
  	}

  	currentChatId = $active_chat.id;
  });
});

</script>

{#if ($current_user.id && $active_chat.id)}
  <p class="_debug">Messages of: {$active_chat.id}</p>

  {#each messages as msg}
  <ChatMessage viewerId="{$current_user.id}" msg="{msg}"/>
  {:else}
  <p class="flow-text center-align">no messages yet</p>
  {/each}

{/if}