<script>
import {onDestroy} from 'svelte';
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
import {Unsubscriby} from "sickspack/unsubscriby";
import {_lang} from "sickspack/multilang/lang";
import Lang from "sickspack/multilang/Lang.svelte";

const unsubscriber = new Unsubscriby(onDestroy);

let availableLangs = Multilang.getSupportedLanguages();
let langsSelectorValues = writable(availableLangs);
let langsSelector = null;

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

		if(result.isSuccess()) {
			$new_tag_store = result.data;
			formController.props['tag'].value = '';
		} else {
			throw result.getErrorMessage();
		}

	} catch (e) {
		UINotification.error(e.toString());
	}
};

unsubscriber.add = current_user.subscribe(() =>
{
	if($current_user.langs)
	{
		$langsSelectorValues = $current_user.langs.all.reduce((langs, l) =>
		{
			langs[l] = availableLangs[l];
			return langs;
		}, {});

		if(langsSelector) {
			langsSelector.$set({value: Object.keys($langsSelectorValues).shift()});
		}
	}
});
</script>

<h2 class="flow-text"><Lang key="app.user_settings.tags.new_tag_form.heading"/></h2>

<form ref="form" on:submit|preventDefault={createTag}>
	<div class="row">
		<div class="col s12 m12">
			<TextInput bind:value={formController.props['tag'].value}
								 label="{_lang('app.user_settings.tags.new_tag_form.controls.tag')}"
								 error={formController.props['tag'].error}
								 errorMessage="{formController.props['tag'].message}" />
		</div>
	</div>
	<div class="row">
		<div class="col s12 m4">
			<Select bind:value="{formController.props['kind'].value}"
							options="{_lang('app.tag.kinds')}"
							label="{_lang('app.user_settings.tags.new_tag_form.controls.kind')}"
							errorMessage="{formController.props['tag'].message}"/>
		</div>
		<div class="col s12 m4">
			<Select bind:value="{formController.props['lang'].value}"
							bind:this="{langsSelector}"
							options="{$langsSelectorValues}"
							label="{_lang('app.user_settings.tags.new_tag_form.controls.lang')}"
							errorMessage="{formController.props['tag'].message}"/>
		</div>
		<div class="col s12 m4">
			<FormButtons cancelButton={false} submitText="{_lang('app.user_settings.tags.new_tag_form.controls.submit')}" isLoading="{formController.isBusy}" />
		</div>
	</div>
</form>
