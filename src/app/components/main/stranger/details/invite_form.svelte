<script>
import { onDestroy } from 'svelte'

import TextInput from '../../../../../lib/ui/components/forms/text_input.svelte'
import FormButtons from '../../../../../lib/ui/components/forms/buttons.svelte'
import { FormController } from '../../../../../lib/ui/FormController'
import { current_user } from '../../../../stores/current_user'
import { selected_stranger } from '../../../../stores/selected_strager'
import {lang_url} from "../../../general/link";
import {formatDate} from "../../../../../lib/Date";
import ApiClient from "../../../../api/client";
import {ChatsListAPI} from "../../../../api/providers/app/chat/ChatsListAPI";
import UINotification from "../../../ui/notification";
import {_lang} from "sickspack/multilang/lang";

let formController = new FormController({
	subject: {
		presence: true
	}
});

formController.addProp("subject");

const invite = async () =>
{
	try
	{
		await formController.validate();

		const result = await ApiClient.stranger($selected_stranger.id).invite(
			formController.props["subject"].value
		);

		if(result.isSuccess()) {
			UINotification.success(_lang('app.stranger.inviteForm.successMessage'));
		} else {
			throw result.getErrorMessage();
		}
	}
	catch (error)
	{
		UINotification.error(error.toString());
	}
};

onDestroy(() => {

});

</script>

<p class="">was online {formatDate($selected_stranger.lastActiveAt)}</p>
<div class="divider"></div>

<div class="card-panel">
	{#if $selected_stranger.id}
	<h3><a href="{lang_url('user/' + $selected_stranger.id)}">{$selected_stranger.tags.primary.string}</a></h3>
	<p class="flow-text">
		{$selected_stranger.tags.secondary.string}
		<br/>
		karma: {$selected_stranger.karma}
	</p>
	<form ref="form" on:submit|preventDefault={invite}>
		<TextInput label="subject"
							 bind:value={formController.props["subject"].value}
							 error={formController.props["subject"].error} isFocused={true}
							 errorMessage={formController.props["subject"].message} />

		<FormButtons classes="btn-full" cancelButton={false} submitText="Invite" isLoading={formController.isBusy} />
	</form>
	{/if}
</div>