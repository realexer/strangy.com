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
import Metadata from '../../app/components/general/Metadata.svelte'

export let activeUsers = [];

</script>

<Metadata page="index"/>

<section class="container">
	<AppIndex activeUsers="{activeUsers}"/>
</section>
<div class="divider"></div>
<section class="container center-align">
	<GeneralDescription/>
</section>
