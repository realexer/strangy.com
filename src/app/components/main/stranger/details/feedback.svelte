<script>
import {onMount, onDestroy} from 'svelte'
import {UserFeedbackAPI} from '../../../../api/providers/app/UserFeedback'
import {selected_stranger} from '../../../../stores/selected_strager';
import {Unsubscriby} from "sickspack/unsubscriby";
import {formatDate} from "../../../../../lib/Date";
import {_lang} from "sickspack/multilang/lang";
import Lang from "sickspack/multilang/Lang.svelte";


let feedbackHistory = [];
const unsubscribe = new Unsubscriby(onDestroy);

onMount(() =>
{
	unsubscribe.add = selected_stranger.subscribe(async (user) =>
	{
		if($selected_stranger.id)
		{
			const results = await UserFeedbackAPI.instance($selected_stranger.id).history().get();
			feedbackHistory = results.map(d => d.data());
		}
	});
});

</script>


<div class="">
	{#each feedbackHistory as feedback}
	<div class="">
		<div class="card-panel">
			<div class="flow-text">
				{#if feedback.vote}
				<i class="material-icons" data-icon="favorite"></i>
				{/if}
				{feedback.message}
			</div>
		</div>
		<p>{formatDate(feedback.setAt)}</p>
	</div>
	{:else}
	<p class="flow-text center-align">
		<Lang key="app.stranger.details.feedback.placeholder"/>
	</p>
	{/each}
</div>