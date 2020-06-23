<script>
import IconPoint from '../../app/components/ui/IconPoint.svelte'
import {_lang} from '../../app/lang'
import Lang from '../../app/lang.svelte'
import env from '../../env';
import {lang_url} from "../../app/components/general/link";

</script>

<svelte:head>
	<title>{_lang("meta.index.title")}</title>
	<meta name="description" content='{_lang("meta.index.description")}'/>
</svelte:head>

<div class="container center-align">
	<h1 class=""><Lang key="pages.index.heading"/></h1>
	<p class="flow-text"><Lang key="pages.index.coming_soon"/></p>
</div>
{#if env.dev.app_preview}
<div class="divider"></div>
<div class="container center-align">
	<h2>Try early alpha version</h2>
	<p class="flow-text">
		The development is currently on going, but your already have a chance to taste the concept and general ideas.
	</p>
	<a href="{lang_url('app')}" class="btn btn-large">Open Strangy</a>
</div>
{/if}