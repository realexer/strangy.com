<script>

import {onDestroy} from 'svelte';
import Textarea from '../../../../../lib/ui/components/forms/textarea.svelte'
import FormButtons from '../../../../../lib/ui/components/forms/buttons.svelte'
import { FormController } from '../../../../../lib/ui/FormController'

import { active_chat, active_chat_changed } from '../../../../stores/user/active_chat';

import {ChatMessagesAPI} from '../../../../api/providers/app/chat/ChatMessagesAPI';
import ApiClient from "../../../../api/client";
import UINotification from "../../../ui/notification";
import {_lang} from "sickspack/multilang/lang";
import {Unsubscriby} from "sickspack/unsubscriby";

let unsubscriber = new Unsubscriby(onDestroy);

let formController = new FormController({
  message: {
    presence: true,
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

unsubscriber.add = active_chat_changed.subscribe((val) =>
{
  if(val) {
    formController.reset();
  }
});

</script>

{#if $active_chat.status.isActive}
<form ref="form" on:submit|preventDefault={sendMessage}>
  <Textarea bind:value={formController.props["message"].value}
  					id="chat_message"
  					placeholder="{_lang('app.chat.active.messaging.form.input')}"
            error={formController.props["message"].error} isFocused={true}
            errorMessage={formController.props["message"].message} />

  <FormButtons cancelButton={false}
  							submitText="{_lang('app.chat.active.messaging.form.send')}"
  							isLoading={formController.isBusy} />
</form>

<p class="_debug">Send message to: {$active_chat.id}</p>
{/if}