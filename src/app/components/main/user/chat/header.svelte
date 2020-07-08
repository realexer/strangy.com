<script>

import {onMount, onDestroy} from 'svelte';
import {writable} from 'svelte/store';
import Textarea from '../../../../../lib/ui/components/forms/textarea.svelte'
import FormButtons from '../../../../../lib/ui/components/forms/buttons.svelte'
import { FormController } from '../../../../../lib/ui/FormController'

import { active_chat, active_chat_stranger } from '../../../../stores/user/active_chat'
import { current_user } from '../../../../stores/current_user';

import {FeedbackModel} from '../../../../api/providers/common/models/firebase/FeedbackModel'

import {lang_url} from '../../../general/link';
import * as ApiRequest from "../../../../api/ApiRequest";
import ApiClient from "../../../../api/client";
import {UserFeedbackAPI} from "../../../../api/providers/app/UserFeedback";
import {UnsubscriberX} from "../../../../../lib/UnsubscriberX";
import UINotification from "../../../ui/notification";
import {_lang} from "sickspack/multilang/lang";


const unsubscribe = new UnsubscriberX(onDestroy);

let optionsOpen = false;
let feedbackOpen = false;
let currentFeedback = writable(new FeedbackModel());

let formController = new FormController({
  message: {
    presence: true,
    length: {
      maximum: 50,
      message: 'must be no more than 50 characters'
    }
  }
});

formController.addProp("message");

const changeVote = async () =>
{
	$currentFeedback.vote = $currentFeedback.vote == 0 ? 1 : 0;

  await submitFeedback();
};

const addMessage = async () =>
{
	feedbackOpen = false;

	await formController.validate();
	$currentFeedback.message = formController.props["message"].value;
  await submitFeedback();
};

const submitFeedback = async () =>
{
	const result = await ApiClient.stranger($active_chat_stranger.id).feedback.set(
		$currentFeedback.vote,
		$currentFeedback.message);

	if(result.isSuccess()) {
		UINotification.success(_lang('app.chat.active.feedback.successMessage'));
	} else {
		UINotification.error(result.getErrorMessage());
	}
};

$: if($current_user.id && $active_chat.id) {

	unsubscribe.addSingle(() => {
		return UserFeedbackAPI.instance($active_chat.users.stranger($current_user.id)).getVoteByUser($current_user.id).subscribe((doc) =>
		{
			$currentFeedback = doc.data() || new FeedbackModel();
			formController.props['message'].value = $currentFeedback.message;
		})
	}, 'UserVote');
}


const ChatOperations =
{
  acceptInvitation: async () => {
  	return await ApiClient.chat($active_chat.id).operations.acceptInvitation();
  },
  declineInvitation: async () => {
  	return await ApiClient.chat($active_chat.id).operations.declineInvitation();
  },
  cancelInvitation: async () => {
  	return await ApiClient.chat($active_chat.id).operations.cancelInvitation();
  },
  finishChat: async () => {
  	return await ApiClient.chat($active_chat.id).operations.finishChat();
  },
  renameChat: () => {

  },
};

const showDetails = () =>
{

};

</script>

{#if $active_chat.id}
<div class="_debug">{$active_chat.state.get()}</div>
<div class="">
	<h2 class="flow-text">
		{$active_chat.subject}
		<span class="right">
			{#if ($current_user.id && $active_chat_stranger.id)}
				<span class="">
					<a class="muted" href="#!" on:click|preventDefault="{() => { optionsOpen = !optionsOpen; }}">
						<i class="material-icons right">more_vert</i>
					</a>
				</span>
			{/if}
		</span>
	</h2>

  {#if optionsOpen}
  <div class="card">
		<div class="card-action">
			<a href="#!" on:click|preventDefault="{ChatOperations.renameChat}">
				<i class="material-icons left">edit</i>Rename
			</a>
		</div>
    <div class="card-action">
    	<a href="#!" on:click|preventDefault="{ChatOperations.finishChat}">
    		<i class="material-icons left">clear</i>
    		finish conversation
			</a>
    </div>
  </div>
  {/if}
</div>

<div class="">
	{#if $active_chat_stranger.id}
		<div class="row">
			<div class="left">
				<span class="">
					<a href="{lang_url('user/'+$active_chat_stranger.id)}">{$active_chat_stranger.tags.primary.string}</a>
					<!--span class="">{$active_chat_stranger.karma}</span-->
				</span>
			</div>
			<div class="right">
				<span>
					<a class="btn-icon" href="#!" on:click|preventDefault="{() => { changeVote(); }}">
						<i class="material-icons bright" data-icon="{$currentFeedback.vote == 1 ? 'favorite' : 'favorite_border'}"></i>
					</a>
					<a class="btn-icon" href="#!" on:click|preventDefault="{() => { feedbackOpen = !feedbackOpen; }}">
						<i class="material-icons muted" data-icon="short_text"></i>
					</a>
				</span>
			</div>
		</div>
	{/if}
	{#if feedbackOpen}
	<div class="">
		<form ref="form" on:submit|preventDefault={addMessage}>
			<div class="row">
				<div class="col s11 no-padding">
					<Textarea bind:value={formController.props["message"].value}
													error={formController.props["message"].error} isFocused={true}
													errorMessage={formController.props["message"].message} />
				</div>
				<div class="col s1">
					<FormButtons cancelButton={false} submitText=">" isLoading={formController.isBusy} />
				</div>
			</div>
		</form>
	</div>
	{/if}
</div>

{#if ($active_chat.state.isWaitingResponse() && $active_chat.state.isInvitation($current_user.id).received)}
<div>
  <div class="card horizontal">
    <div class="card-stacked center-align">
      <div class="card-content">
        <button class="btn btn-large" on:click="{ChatOperations.acceptInvitation}">Accept invitation</button>
      </div>
      <div class="card-action">
        <a href="#!" on:click|preventDefault="{ChatOperations.declineInvitation}">reject</a>
      </div>
    </div>
  </div>
</div>
{/if}
{#if ($active_chat.state.isWaitingResponse() && $active_chat.state.isInvitation($current_user.id).sent) }
<div class="card horizontal">
  <div class="card-stacked center-align">
    <div class="card-content">
      <p class="flow-text">invitation is pending response</p>
    </div>
    <div class="card-action">
      <a href="#!" on:click|preventDefault="{ChatOperations.cancelInvitation}">Cancel invitation</a>
    </div>
  </div>
</div>
{/if}
{/if}