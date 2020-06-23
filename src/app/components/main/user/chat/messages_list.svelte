<script>

import {onMount, onDestroy} from 'svelte'
import {ChatMessagesAPI, ChatOperationsAPI} from '../../../../api/Chats'
import {active_chat} from '../../../../stores/user/active_chat'
import {current_user} from '../../../../stores/current_user'
import {ChatModel as chat} from "../../../../api/models/ChatModel";
import {UnsubscriberX} from "../../../../../lib/UnsubscriberX";

let unsubscribes = new UnsubscriberX();

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

const loadMessages = (chat) =>
{
  return ChatMessagesAPI.instance(chat).messages().get()
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
const listenToMessages = (chat) =>
{
  return ChatMessagesAPI.instance(chat).messages().subscribe({
    args: [subscribeToNewMessagesAfter],
    func: (result) =>
    {
      processMessages(result.docs);
    }
  });
};

const processMessages = (docs) =>
{
  docs.forEach((doc) =>
  {
    const msg = doc.data();
    msg.id = doc.id;

    if(loadedMessageIds.indexOf(msg.id) === -1) {
      pushMessage(msg);
    }
  });

  if(lastLoadedMessageAt.seconds > $active_chat.getLastReadMessageAtForUser($current_user.id).seconds)
  {
  	console.log(`LastLoadedMessageAt is bigger than lastReadMessageAtForUser`);
    ChatOperationsAPI.instance($active_chat).setLastReadMessageAtByUser($current_user.id, lastLoadedMessageAt);
    ChatOperationsAPI.instance($active_chat).resetNewMessagesAmountForUser($current_user.id);
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

  		loadMessages($active_chat).then(() =>
  		{
  			unsubscribes.addNamed(listenToMessages($active_chat), 'messages');
  		});
  	}

  	currentChatId = $active_chat.id;
  });
});

onDestroy(() =>
{
	unsubscribes.finish();
});

</script>

{#if ($current_user.id && $active_chat.id)}
  <p class="_debug">Messages of: {$active_chat.id}</p>

  {#each messages as msg}
  <div class="row">
    <div class="col {($current_user.id == msg.from_user_id) ? 'offset-s2 s10' : ''} no-padding">
      <div class="card">
        <div class="card-content">
          {msg.text}
        </div>
      </div>
      <p class="_debug">from: {msg.from_user_id}</p>
    </div>
  </div>
  {/each}

{/if}