<script>
import {ChatMessagesAPI} from "../../../api/providers/app/chat/ChatMessagesAPI";
import {selected_chat} from "../../../stores/selected_chat";

const messagesPerPage = 20;
let startAt = 0;
let messages = [];

const loadMessages = async () =>
{
  const result = (await ChatMessagesAPI.instance($selected_chat.id).messages().get(messagesPerPage, startAt));
  messages = result.docs.map(d => d.data());
};

selected_chat.subscribe(async () =>
{
	if($selected_chat.id) {
		await loadMessages();
	}
});

</script>

<div class="container center-align">
{#each messages as msg}
<div class="card-panel">{msg.text}</div>
{:else}
No messages
{/each}
</div>