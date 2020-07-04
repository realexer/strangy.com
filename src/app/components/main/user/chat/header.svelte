<script>

import Textarea from '../../../../../lib/ui/components/forms/textarea.svelte'
import FormButtons from '../../../../../lib/ui/components/forms/buttons.svelte'
import { FormController } from '../../../../../lib/ui/FormController'

import { notificationMessage } from '../../../../stores/notification_message.js'
import { active_chat, active_chat_stranger } from '../../../../stores/user/active_chat'
import { current_user } from '../../../../stores/current_user';

import {FeedbackModel} from '../../../../api/providers/common/models/FeedbackModel'

import {lang_url} from '../../../general/link';
import * as ApiRequest from "../../../../api/ApiRequest";
import ApiClient from "../../../../api/client";
import {UserFeedbackAPI} from "../../../../api/providers/app/UserFeedback";


let optionsOpen = false;
let feedbackOpen = false;
let currentFeedback = new FeedbackModel();

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

const setVote = async (value) =>
{
	feedbackOpen = true;
  currentFeedback.vote = value;

  await submitFeedback();
};

const addMessage = async () =>
{
	feedbackOpen = false;

	await formController.validate();
	currentFeedback.message = formController.props["message"].value;
  await submitFeedback();
};

const submitFeedback = async () =>
{
	const result = await ApiClient.stranger($active_chat_stranger.id).feedback.set(
		currentFeedback.vote,
		currentFeedback.message);

	if(result.isSuccess()) {
		notificationMessage.set({ message: 'Feedback submitted', type: 'success-toast' });
	} else {
		notificationMessage.set({ message: result.getErrorMessage(), type: 'danger-toast' });
	}
};

const unsubscribe = active_chat.subscribe((val) =>
{
  if(val && val.id)
  {
    UserFeedbackAPI.instance($active_chat.users.stranger($current_user.id)).getVoteByUser($current_user.id).get()
    .then((doc) =>
    {
      currentFeedback = FeedbackModel.fromDoc(doc);
    });
  }
});

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
					<button class="btn-flat white-text" on:click="{() => { optionsOpen = !optionsOpen; }}">
						<i class="material-icons right">more_vert</i>
					</button>
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
		<p>
			<span>
				<button class="btn-floating" on:click="{() => { setVote(-1); }}"><i class="material-icons">arrow_downward</i></button>
				<span class="flow-text">{$active_chat_stranger.karma}</span>
				<button class="btn-floating" on:click="{() => { setVote(1); }}"><i class="material-icons">arrow_upward</i></button>
			</span>
			<a href="{lang_url('user/'+$active_chat_stranger.id)}">{$active_chat_stranger.tags.primary.string}</a>
		</p>
	{/if}
	{#if feedbackOpen}
	<div class="card-panel">
		<form ref="form" on:submit|preventDefault={addMessage}>
			<Textarea bind:value={formController.props["message"].value}
								error={formController.props["message"].error} isFocused={true}
								errorMessage={formController.props["message"].message} />

			<FormButtons cancelButton={false} submitText="Send" isLoading={formController.isBusy} />
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