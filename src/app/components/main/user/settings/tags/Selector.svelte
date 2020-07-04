<script>

import {onMount} from 'svelte';
import {writable} from 'svelte/store';
import {current_user} from '../../../../../stores/current_user';
import {TagsAPI} from '../../../../../api/providers/app/TagsAPI';
import langs from '../../../../../../_langs/index';
import Checkbox from '../../../../../../lib/ui/components/forms/check_box.svelte';
import NewTagForm from './NewTagForm.svelte';
import ApiClient from "../../../../../api/client";

let unsubscribe = null;
let userLangs = writable([]);
let userTags = writable([]);
let allTags = [];
let tags = [];

onMount(() =>
{
	unsubscribe = current_user.subscribe(() =>
  {
    if($current_user.id) {
      $userTags = $current_user.tags.all;
      $userLangs = $current_user.langs.all;

      loadTags($userLangs).then(() =>
      {
      	userLangs.subscribe(() =>
				{
					saveUserLangs();
					filterTagsByLangs();
				});
      });
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
	if(userHasLang(lang)) {
		$userLangs = $userLangs.filter(userLang => userLang !== lang);
	} else {
		$userLangs = [...$userLangs, lang];
	}
};

const userHasLang = (lang) =>
{
	return $userLangs.indexOf(lang) !== -1;
};

const loadTags = (forLangs) =>
{
  return TagsAPI.all(forLangs).get().then((result) =>
  {
    result.docs.forEach((doc) =>
    {
      const tag = doc.data();
      tag.id = doc.id;

      allTags = [...allTags, tag];
    });

    filterTagsByLangs();
  });
};

const filterTagsByLangs = () =>
{
	tags = allTags.filter((tag) => $userLangs.indexOf(tag.lang) !== -1);
};

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
		<h2 class="flow-text">Your languages</h2>
		<div class="">
		<form>
			{#each Object.keys(langs) as lang}
				<Checkbox checked="{userHasLang(lang)}" onchange="{() => { toggleUserLang(lang); }}" id="user_lang_{lang}">{langs[lang].lang}</Checkbox>
			{/each}
		</form>
		</div>
	</div>

	<div class="col m8">
		<h2 class="flow-text">Describe yourself with tags</h2>
		{#if $userTags.length == 0}
			<p class="text-lighten-3">use tags below to describe yourself</p>
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