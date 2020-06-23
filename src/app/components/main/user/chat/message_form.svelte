<script>

import Textarea from '../../../../../lib/ui/components/forms/textarea.svelte'
import FormButtons from '../../../../../lib/ui/components/forms/buttons.svelte'
import { FormController } from '../../../../../lib/ui/FormController'

import { notificationMessage } from '../../../../stores/notification_message.js'
import { active_chat } from '../../../../stores/user/active_chat';
import { current_user } from '../../../../stores/current_user';

import {ChatMessagesAPI} from '../../../../api/Chats';

let formController = new FormController({
  message: {
    presence: true,
    length: {
      minimum: 6,
      message: 'must be at least 6 characters'
    }
  }
});

formController.addProp("message");

const sendMessage = () =>
{
  formController.validate().then(() =>
  {
    return ChatMessagesAPI.instance($active_chat).sendMessage($current_user.id, formController.props["message"].value)
    .then(() =>
    {
      notificationMessage.set({ message: 'Message sent', type: 'success-toast' });
    })
    .catch((e) =>
    {
      notificationMessage.set({ message: error.message, type: 'danger-toast' });
    });
  }).catch((e) => {});
};

const unsubscribe = active_chat.subscribe((val) =>
{
  if($active_chat.id)
  {
    formController.reset();
  }
});

</script>

<form ref="form" on:submit|preventDefault={sendMessage}>
  <Textarea bind:value={formController.props["message"].value}
            error={formController.props["message"].error} isFocused={true}
            errorMessage={formController.props["message"].message} />

  <FormButtons cancelButton={false} submitText="Send" isLoading={formController.isBusy} />
</form>

<p class="_debug">Send message to: {$active_chat.id}</p>