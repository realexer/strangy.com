<script>
import {_lang} from 'sickspack/multilang/lang'
import Lang from 'sickspack/multilang/Lang.svelte'
import Metadata from "../../../app/components/general/Metadata.svelte";
import {lang_url} from "../../../app/components/general/link";

</script>

<Metadata page="info.status"/>

<div class="container center-align">
	<h1 class=""><Lang key="pages.info.status.heading"/></h1>
</div>
<div class="divider"></div>

{#each Object.keys(_lang('pages.info.status.sections')) as section}
<section class="container">
	<h2><Lang key="pages.info.status.sections.{section}.heading"/></h2>
	<p class="flow-text"><Lang key="pages.info.status.sections.{section}.details"/></p>
</section>
{/each}

<div class="container center-align">
<p><a class="btn btn-large" href="{lang_url('login')}"><Lang key="pages.info.status.login"/></a></p>
</div>