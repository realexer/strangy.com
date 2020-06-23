<script>

import Textarea from '../../../../../lib/ui/components/forms/textarea.svelte'
import FormButtons from '../../../../../lib/ui/components/forms/buttons.svelte'
import { FormController } from '../../../../../lib/ui/FormController'

import { notificationMessage } from '../../../../stores/notification_message.js'
import { active_chat, active_chat_stranger } from '../../../../stores/user/active_chat';
import { current_user } from '../../../../stores/current_user';

import {UserFeedbackVoteAPI} from '../../../../api/Users';
import {FeedbackModel} from '../../../../api/models/FeedbackModel';

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

const setVote = (value) =>
{
  currentFeedback.vote = value;

  submitFeedback();
};

const addMessage = () =>
{
  formController.validate().then(() =>
  {
    currentFeedback.message = formController.props["message"].value;

    submitFeedback();
  }).catch((e) => {

  });
};

const submitFeedback = () =>
{
  return UserFeedbackVoteAPI.set($active_chat_stranger.id, $current_user.id, currentFeedback.vote, currentFeedback.message)
  .then(() =>
  {
    notificationMessage.set({ message: 'Feedback submitted', type: 'success-toast' });
  })
  .catch((e) =>
  {
    notificationMessage.set({ message: error.message, type: 'danger-toast' });
  });
};

const unsubscribe = active_chat.subscribe((val) =>
{
  if(val && val.id)
  {
    UserFeedbackVoteAPI.get($active_chat.users.stranger($current_user.id), $current_user.id)
    .then((doc) =>
    {
      currentFeedback = FeedbackModel.fromDoc(doc);
    });
  }
});

</script>

{#if ($active_chat.id && $current_user.id && $active_chat_stranger.id)}
<h4>{$active_chat_stranger.tags.primary}</h4>
<div class="row">
  <div class="col m4">
    <button on:click="{() => { setVote(-1); }}"><span class="material-icons">arrow_downward</span></button>
  </div>
  <div class="col m4">{$active_chat_stranger.karma}</div>
  <div class="col m4">
    <button on:click="{() => { setVote(1); }}"><span class="material-icons">arrow_upward</span></button>
  </div>
</div>
<form ref="form" on:submit|preventDefault={addMessage}>
  <Textarea bind:value={formController.props["message"].value}
            error={formController.props["message"].error} isFocused={true}
            errorMessage={formController.props["message"].message} />

  <FormButtons cancelButton={false} submitText="Send" isLoading={formController.isBusy} />
</form>
{/if}