<script>
import {_lang} from "sickspack/multilang/lang";
import Lang from "sickspack/multilang/Lang.svelte";
import {lang_url} from "../general/link";

export let kind;
export let tag;
export let popularTags = [];

</script>
<div>
	<h1 class=""><Lang key="info.tag_page_description.{kind}.heading" data="{{tag: tag}}"/></h1>
	<p class="flow-text"><Lang key="info.tag_page_description.{kind}.description" data="{{tag: tag}}"/></p>
	<p class="flow-text"><Lang key="info.tag_page_description.{kind}.other_popular_tags"/></p>
	<p class="">
		{#each popularTags as _tag}
			<a class="chip __tag" href="{`/${_tag.lang}/tag/${_tag.kind}/${_tag.tag}`}">
				{_tag.tag}
			</a>
		{/each}
	</p>
</div>
