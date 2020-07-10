<script context="module">

import {preloadActiveUsers} from "../../app/ssr/acitve_users";

export async function preload(page, session)
{
	return {
		activeUsers: await preloadActiveUsers()
	};
}
</script>

<script>
import IconPoint from '../../app/components/ui/IconPoint.svelte'
import {_lang} from 'sickspack/multilang/lang'
import Lang from 'sickspack/multilang/Lang.svelte'
import env from '../../env';
import {lang_url} from "../../app/components/general/link";
import AppIndex from './app/index.svelte'
import GeneralDescription from '../../app/components/info/general_description.svelte';

export let activeUsers = [];

</script>

<svelte:head>
	<title>{_lang("meta.index.title")}</title>
	<meta name="description" content='{_lang("meta.index.description")}'/>
</svelte:head>

<div class="container">
	<AppIndex activeUsers="{activeUsers}"/>
</div>

<div class="container center-align">
	<GeneralDescription/>
</div>
