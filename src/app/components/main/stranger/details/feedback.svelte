<script>
  import {onMount, onDestroy} from 'svelte'
  import {UserFeedbackAPI} from '../../../../api/providers/app/UserFeedback'
  import {FeedbackModel} from '../../../../api/providers/common/models/firebase/FeedbackModel'

  import {selected_stranger} from '../../../../stores/selected_strager';
  import {UnsubscriberX} from "../../../../../lib/UnsubscriberX";
  import {formatDate} from "../../../../../lib/Date";


  let feedbackHistory = [];
  let unsubscribe = new UnsubscriberX();

  onMount(() =>
  {
  	unsubscribe.add = selected_stranger.subscribe((user) =>
		{
			if($selected_stranger.id)
			{
				UserFeedbackAPI.instance($selected_stranger.id).history().get().then((results) =>
				{
					results.forEach((doc) =>
					{
						feedbackHistory = [...feedbackHistory, doc.data()];
					});
				});
			}
		});
  });

  onDestroy(() => {
    unsubscribe.finish();
  })

</script>


<div class="">
	{#each feedbackHistory as feedback}
	<div class="">
		<div class="card-panel">
			<div class="flow-text">{feedback.message ? feedback.message : feedback.vote}</div>
		</div>
		<p>{formatDate(feedback.setAt)}</p>
	</div>
	{:else}
	<p class="flow-text center-align">No feedback yet</p>
	{/each}
</div>