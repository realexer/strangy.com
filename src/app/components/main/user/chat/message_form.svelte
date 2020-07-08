<script>

import Textarea from '../../../../../lib/ui/components/forms/textarea.svelte'
import FormButtons from '../../../../../lib/ui/components/forms/buttons.svelte'
import { FormController } from '../../../../../lib/ui/FormController'

import { active_chat } from '../../../../stores/user/active_chat';
import { current_user } from '../../../../stores/current_user';

import {ChatMessagesAPI} from '../../../../api/providers/app/chat/ChatMessagesAPI';
import ApiClient from "../../../../api/client";
import UINotification from "../../../ui/notification";

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

const sendMessage = async () =>
{
	try {
		await formController.validate();

		const result = await ApiClient.chat($active_chat.id).messages.send(formController.props["message"].value);

		if(result.isError()) {
			throw result.getErrorMessage();
		}

	} catch (error) {
		UINotification.error(error.toString());
	}
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