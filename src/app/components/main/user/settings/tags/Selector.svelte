<script>

import {onMount, onDestroy} from 'svelte';
import {writable} from 'svelte/store';
import {current_user} from '../../../../../stores/current_user';
import {TagsAPI} from '../../../../../api/providers/app/TagsAPI';
import Checkbox from '../../../../../../lib/ui/components/forms/check_box.svelte';
import NewTagForm from './NewTagForm.svelte';
import ApiClient from "../../../../../api/client";
import Multilang from "sickspack/multilang";
import {Unsubscriby} from "sickspack/unsubscriby";
import {new_tag_store} from './new_tag_store';
import {_lang} from "sickspack/multilang/lang";
import Lang from "sickspack/multilang/Lang.svelte";

const availableLangs = Multilang.getSupportedLanguages();
let unsubscribe = new Unsubscriby(onDestroy);

let userLangs = writable([]);
let userTags = writable([]);
let allTags = [];
let tags = [];

onMount(() =>
{
	unsubscribe.add = current_user.subscribe(async () =>
  {
    if($current_user.id) {
      $userTags = $current_user.tags.all;
      $userLangs = $current_user.langs.all;

      await loadTags($userLangs);

			userLangs.subscribe(() =>
			{
				filterTagsByLangs();
			});
    }
  });

	unsubscribe.add = new_tag_store.subscribe((tag) => {
		if(tag && tag.id) {
			addUserTag(tag);

			$new_tag_store = null;
		}
	});
});

const saveUserLangs = async () =>
{
	if($userLangs)
	{
		await ApiClient.user.info.langs.save($userLangs);
	}
};

const toggleUserLang = (lang) =>
{
	if($userLangs.includes(lang)) {
		$userLangs = $userLangs.filter(userLang => userLang !== lang);
	} else {
		$userLangs = [...$userLangs, lang];
	}

	saveUserLangs();
};

const loadTags = async (forLangs) =>
{
	const result = await TagsAPI.all(forLangs).get();

	allTags = result.docs.map(d => d.data());

	filterTagsByLangs();
};

const filterTagsByLangs = () =>
{
	tags = allTags.filter((tag) => $userLangs.indexOf(tag.lang) !== -1).map(t => t.toCompleteObject());
};

/**
*
* @param tag
* @returns {Promise<*>}
*/
const addUserTag = (tag) =>
{
  $userTags = [...$userTags, tag];

  return saveUserTags();
};

const removeUserTag = (tag) =>
{
  $userTags = $userTags.filter((item) => {
    return item.id != tag.id;
  });

  return saveUserTags();
};

const saveUserTags = async () =>
{
	return await ApiClient.user.info.tags.save($userTags);
};

</script>

{#if $current_user.id}
<div class="_debug">{$current_user.id}</div>

<div class="row">

	<div class="col m4">
		<h2 class="flow-text"><Lang key="app.user_settings.langs.heading"/></h2>
		<div class="">
		<form>
			{#each Object.keys(availableLangs) as lang}
				<Checkbox checked="{$userLangs.includes(lang)}" onchange="{() => { toggleUserLang(lang); }}" id="user_lang_{lang}">{availableLangs[lang]}</Checkbox>
			{/each}
		</form>
		</div>
	</div>

	<div class="col m8">
		<h2 class="flow-text"><Lang key="app.user_settings.tags.selector.heading"/></h2>
		{#if $userTags.length == 0}
			<p class="">
				<Lang key="app.user_settings.tags.selector.description"/>
			</p>
		{:else}
			{#each $userTags as tag}
				<div class="chip activator green" on:click="{() => {removeUserTag(tag)}}">
					{tag.tag} [{tag.lang}]
				</div>
			{/each}
			<p></p>
			{/if}
			<div class="">
				{#each tags as tag}
				<div class="chip" on:click="{() => {addUserTag(tag)}}">
					{tag.tag} <span class="_debug">[{tag.lang}]</span>
					<i class="">{tag.users_amount}</i>
				</div>
				{/each}
			</div>
		<NewTagForm/>
	</div>
</div>
{/if}