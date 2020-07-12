<script context="module">

export async function preload(page, session)
{
	return {
		chatId: page.params.chat_id
	};
}

</script>
<script>
import {onMount} from 'svelte';
import ChatHistory from '../../../../app/components/main/chat/history.svelte'
import {selected_chat} from "../../../../app/stores/selected_chat";
import {ChatsListAPI} from "../../../../app/api/providers/app/chat/ChatsListAPI";
import Metadata from "../../../../app/components/general/Metadata.svelte";

export let chatId;


onMount(() =>
{
	if($selected_chat.id === undefined)
  {
  	ChatsListAPI.chat(chatId).get().then((doc) => {
  		$selected_chat = doc.data();
  	});
  }
});

</script>

<Metadata page="chat.history"/>

<div class="container">
	<ChatHistory chat="{$selected_chat}"/>
</div>