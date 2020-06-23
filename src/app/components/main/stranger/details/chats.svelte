<script>
  import {ChatsListAPI} from '../../../../api/Chats'
  import {ChatModel} from '../../../../api/models/ChatModel'

  import {selected_stranger} from '../../../../stores/selected_strager';
  import {formatDate} from "../../../../../lib/Date";

	let chats = [];

  const unsubscribe = selected_stranger.subscribe((user) =>
  {
    if($selected_stranger.id)
    {
      ChatsListAPI.userChats($selected_stranger.id).get().then((results) =>
      {
        results.forEach((doc) =>
        {
          chats = [...chats, ChatModel.fromDoc(doc)];
        });
      });
    }
  });

</script>

<div class="">
	{#each chats as chat}
	<div class="row card-panel">
		<div class="col s8">
			<p class="flow-text">{chat.subject}</p>
			<p>{chat.status.get()}, {chat.state.get()}</p>
			<p>{formatDate(chat.date.startedAt)}</p>
		</div>
		<div class="col s4">
			<p class="flow-text">1 msg/s</p>
		</div>
	</div>
	{/each}
</div>