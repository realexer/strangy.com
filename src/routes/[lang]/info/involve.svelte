<script>
import IconPoint from '../../../app/components/ui/IconPoint.svelte'
import {_lang} from 'sickspack/multilang/lang'
import Lang from 'sickspack/multilang/Lang.svelte'
</script>

<svelte:head>
	<title>{_lang("meta.involve.title")}</title>
	<meta name="description" content='{_lang("meta.involve.description")}'/>
</svelte:head>

<div class="container center-align">
	<h1 class=""><Lang key="pages.involve.heading"/></h1>
</div>
<div class="divider"></div>
<div class="container center-align">
	<IconPoint icon="" image="/icons/icons8-twitter.svg">
		<a href="https://twitter.com/strangycom" target="_blank">Official Twitter account</a>
		<p><Lang key="pages.involve.methods.twitter"/></p>
	</IconPoint>
	<IconPoint icon="" image="/icons/icons8-github.svg">
		<a href="https://github.com/realexer/strangy.com" target="_blank">GitHub Repository</a>
		<p><Lang key="pages.involve.methods.github"/></p>
	</IconPoint>
</div>


<div class="container center-align">
<p>Icons by <a target="_blank" href="https://icons8.com">Icons8</a></p>
</div>
