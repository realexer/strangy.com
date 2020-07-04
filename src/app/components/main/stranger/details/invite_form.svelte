<script>
  import { onDestroy } from 'svelte'

  import { notificationMessage } from '../../../../stores/notification_message.js'

  import TextInput from '../../../../../lib/ui/components/forms/text_input.svelte'
  import FormButtons from '../../../../../lib/ui/components/forms/buttons.svelte'
  import { FormController } from '../../../../../lib/ui/FormController'
  import { current_user } from '../../../../stores/current_user'
  import { selected_stranger } from '../../../../stores/selected_strager'
  import {lang_url} from "../../../general/link";
  import {formatDate} from "../../../../../lib/Date";
  import ApiClient from "../../../../api/client";
  import {ChatsListAPI} from "../../../../api/providers/app/chat/ChatsListAPI";

  let formController = new FormController({
    subject: {
      presence: true,
      length: {
        minimum: 6,
        message: 'must be at least 6 characters'
      }
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
				notificationMessage.set({ message: 'Invitation sent', type: 'success-toast' });
			} else {
				notificationMessage.set({ message: result.getErrorMessage(), type: 'danger-toast' });
			}
		}
		catch (error)
		{
			notificationMessage.set({ message: error.message, type: 'danger-toast' });
		}
  };

  onDestroy(() => {

  });

</script>

<div class="card-panel">
	<div class="">was online {formatDate($selected_stranger.lastActiveAt)}</div>
	<div class="divider"></div>
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