<script context="module">

import Lang from 'sickspack/multilang/Lang.svelte';
import AppIndex from '../../app/index.svelte';
import {preloadActiveUsers} from "../../../../app/ssr/acitve_users";

export async function preload(page, session)
{
	const reqData = {
		kind: page.params.kind,
		tag: page.params.tag
	};

	return Object.assign({}, reqData, {
		activeUsers: await preloadActiveUsers(reqData.tag, reqData.kind)
	});
}

</script>

<script>

export let kind;
export let tag;
export let activeUsers;


</script>

<div class="container center-align">
	<h1 class="flow-text">
		<Lang key="{`pages.tag.heading.kind.${kind}`}" data="{{tag: tag}}"/>
	</h1>
	<p><Lang key="pages.tag.heading.currently_online" data="{{online: 1}}"/></p>
	<AppIndex activeUsers="{activeUsers}"/>
</div>