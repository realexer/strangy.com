<script context="module">

import Lang from 'sickspack/multilang/Lang.svelte';
import AppIndex from '../../app/index.svelte';
import {preloadActiveUsers} from "../../../../app/ssr/acitve_users";
import {TagsAPI} from "../../../../app/api/providers/app/TagsAPI";
import Metadata from "../../../../app/components/general/Metadata.svelte";

export async function preload(page, session)
{
	const reqData = {
		lang: page.params.lang,
		kind: page.params.kind,
		tag: page.params.tag
	};

	const matchingTags = await TagsAPI.findTag(reqData.tag, reqData.kind).get();
	const otherTags = await TagsAPI.all([reqData.lang], reqData.kind).limit(10).get();

	if(matchingTags.docs.length === 0) {
		this.redirect(301, '/not_found');
	}

	const topMatch = matchingTags.docs.shift().data();

	if(topMatch.lang != reqData.lang) {
		this.redirect(301, encodeURI(`/${topMatch.lang}/tag/${topMatch.kind}/${topMatch.tag}`));
	}

	return Object.assign({}, reqData, {
		activeUsers: await preloadActiveUsers(reqData.tag, reqData.kind),
		popularTags: otherTags.docs.map(d => d.data())
	});
}

</script>

<script>

import TagPageDescription from '../../../../app/components/info/tag_page_description.svelte';

export let kind;
export let tag;
export let activeUsers;
export let popularTags;

const xdata = {
	xtag: tag,
	xkind: kind,
	xonline: activeUsers.length,
}

</script>

<Metadata page="tag.{kind}.default" data="{xdata}"/>

<section class="container center-align">
	<h2 class="flow-text">
		<Lang key="{`pages.tag.heading.kind.${kind}`}" data="{xdata}"/>
	</h2>
	<p><Lang key="pages.tag.heading.currently_online" data="{xdata}"/></p>
	<AppIndex activeUsers="{activeUsers}"/>
</section>
<div class="divider"></div>
<section class="container center-align">
<TagPageDescription kind="{kind}" tag="{tag}" popularTags="{popularTags}"/>
</section>