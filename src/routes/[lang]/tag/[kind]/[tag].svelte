<script context="module">

import Lang from 'sickspack/multilang/Lang.svelte'
import AppIndex from '../../app/index.svelte'

export async function preload(page, session)
{
	return {
		kind: page.params.kind,
		tag: page.params.tag
	};
}

</script>

<script>

export let kind;
export let tag;


</script>

<div class="container center-align">
	<h1 class="flow-text">
		<Lang key="{`pages.tag.heading.kind.${kind}`}" data="{{tag: tag}}"/>
	</h1>
	<p><Lang key="pages.tag.heading.currently_online" data="{{online: 1}}"/></p>
	<AppIndex/>
</div>