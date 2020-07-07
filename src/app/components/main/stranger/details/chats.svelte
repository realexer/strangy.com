<script>
  import {ChatsListAPI} from '../../../../api/providers/app/chat/ChatsListAPI'
  import {ChatModel} from '../../../../api/providers/common/models/firebase/ChatModel'

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
          chats = [...chats, doc.data()];
        });
      });
    }
  });

</script>

<div class="">
	{#each chats as chat}
	<div class="card-panel">
		<div class="row no-margin">
			<div class="col s8">
				<div class="flow-text">{chat.subject}</div>
				<p>{chat.status.get()}, {chat.state.get()}</p>
				<p>{formatDate(chat.date.startedAt)}</p>
			</div>
			<div class="col s4 right-align">
				<div class="">{chat.messagesAmount} msg/s</div>
			</div>
		</div>
	</div>
	{:else}
	<p class="flow-text center-align">No chats yet</p>
	{/each}
</div>