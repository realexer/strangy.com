<script>
  import Project from '../../../../../../_config/project'
  import TextInput from '../../../../../../lib/ui/components/forms/text_input.svelte'
  import Select from '../../../../../../lib/ui/components/forms/select.svelte'
  import FormButtons from '../../../../../../lib/ui/components/forms/buttons.svelte'

  import { notificationMessage } from '../../../../../stores/notification_message.js'

  import { TagsAPI, TagKind, TagKindLabels } from '../../../../../api/TagsAPI'
  import { FormController } from '../../../../../../lib/ui/FormController'

  import {current_user} from '../../../../../stores/current_user'
  import langs from '../../../../../../_langs/index'

  const langsSelectorValues = Object.fromEntries(Object.keys(langs).map(key => [
  	key, langs[key].lang
  ]));

  console.log(langsSelectorValues);

  let formController = new FormController({
    tag: {
        presence: true
    },
    kind: {
        presence: true,
    },
    lang: {
        presence: true,
    }
  });

  formController.addProp("tag");
  formController.addProp("kind");
  formController.addProp("lang");

  const createTag = () =>
  {
    formController.isBusy = true;

    formController.validate().then(() =>
    {
      return TagsAPI.create(
        formController.getProp('tag').value,
        formController.getProp('lang').value,
        formController.getProp('kind').value,
        $current_user.id)
      .then(() => {
        notificationMessage.set({ message: 'Tag added', type: 'green' });
      })
      .catch(error => {
        notificationMessage.set({ message: error, type: '' });
      });
    }).catch((e) => {});
  }
</script>

<h2 class="flow-text">Add new tag</h2>

<form ref="form" on:submit|preventDefault={createTag}>
	<div class="row">
		<div class="col s12 m12">
			<TextInput bind:value={formController.props['tag'].value}
								 placeholder="new tag"
								 label="New tag"
								 error={formController.props['tag'].error}
								 errorMessage="{formController.props['tag'].message}" />
		</div>
	</div>
	<div class="row">
		<div class="col s12 m4">
			<Select bind:value="{formController.props['kind'].value}"
							optionsMap="{TagKindLabels}"
							errorMessage="{formController.props['tag'].message}"/>
		</div>
		<div class="col s12 m4">
			<Select bind:value="{formController.props['lang'].value}"
							optionsMap="{langsSelectorValues}"
							errorMessage="{formController.props['tag'].message}"/>
		</div>
		<div class="col s12 m4">
			<FormButtons cancelButton={false} submitText="Create" isLoading="{formController.isBusy}" />
		</div>
	</div>
</form>
