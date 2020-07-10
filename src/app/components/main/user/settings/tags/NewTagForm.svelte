<script>
import {writable} from 'svelte/store';
import Project from '../../../../../../_config/project'
import TextInput from '../../../../../../lib/ui/components/forms/text_input.svelte'
import Select from '../../../../../../lib/ui/components/forms/select.svelte'
import FormButtons from '../../../../../../lib/ui/components/forms/buttons.svelte'

import { TagsAPI} from '../../../../../api/providers/app/TagsAPI'
import { FormController } from '../../../../../../lib/ui/FormController'

import {current_user} from '../../../../../stores/current_user'
import ApiClient from "../../../../../api/client";
import {TagKind, TagKindLabels} from "../../../../../api/providers/common/tags";
import Multilang from "sickspack/multilang";
import UINotification from "../../../../ui/notification";
import {new_tag_store} from "./new_tag_store";


let availableLangs = Multilang.getSupportedLanguages();
let langsSelectorValues = writable(availableLangs);

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

const createTag = async () =>
{
	try {
		await formController.validate();

		const result = await ApiClient.user.info.tags.create(
			formController.getProp('tag').value,
			formController.getProp('lang').value,
			formController.getProp('kind').value
		);

		$new_tag_store = result.data;

		if(result.isError()) {
			throw result.getErrorMessage();
		}

	} catch (e) {
		UINotification.error(e.toString());
	}
};

current_user.subscribe(() =>
{
	if($current_user.langs)
	{
		$langsSelectorValues = $current_user.langs.all.reduce((langs, l) =>
		{
			langs[l] = availableLangs[l];
			return langs;
		}, {});
	}
});
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
							options="{TagKindLabels}"
							errorMessage="{formController.props['tag'].message}"/>
		</div>
		<div class="col s12 m4">
			<Select bind:value="{formController.props['lang'].value}"
							options="{$langsSelectorValues}"
							errorMessage="{formController.props['tag'].message}"/>
		</div>
		<div class="col s12 m4">
			<FormButtons cancelButton={false} submitText="Create" isLoading="{formController.isBusy}" />
		</div>
	</div>
</form>
