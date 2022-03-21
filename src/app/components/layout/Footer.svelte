<script>

import Multilang from "sickspack/multilang";
import Lang from 'sickspack/multilang/Lang.svelte';
import {lang_url} from "../general/link";

const availableLangs = Multilang.getSupportedLanguages();

</script>

<footer class="page-footer">
	<div class="container">
		<div class="row">
			<div class="col m4 s6">
				<h5><Lang key="layout.footer.info.heading"/></h5>
				<p><a href="{lang_url('info/about')}"><Lang key="layout.footer.info.links.about"/></a></p>
				<p><a href="{lang_url('info/involve')}"><Lang key="layout.footer.info.links.involve"/></a></p>
				<p><a href="{lang_url('info/status')}"><Lang key="layout.footer.info.links.status"/></a></p>
				<p><a href="{lang_url('info/contact')}"><Lang key="layout.footer.info.links.contact"/></a></p>
				<p>&copy; strangy.com</p>
				<p>&nbsp;</p>
				<p>
					<Lang key="layout.footer.info.links.powered_by"/>
					<a href="https://sveltebase.com" target="_blank">SvelteBase</a>
				</p>
			</div>

			<div class="col m4 s6">
				<h5><Lang key="layout.footer.social.heading"/></h5>
				<p><a href="https://twitter.com/StrangyCom" target="_blank" rel="external">Twitter</a></p>
				<p><a href="https://github.com/realexer/strangy.com" target="_blank" rel="external"><Lang key="layout.footer.social.links.github"/></a></p>
				<p><a href="https://reddit.com/r/strangy" target="_blank" rel="external"><Lang key="layout.footer.social.links.reddit"/></a></p>
				<p><a href="https://medium.com/@realexer" target="_blank" rel="external"><Lang key="layout.footer.social.links.medium"/></a></p>
				<p><a href="https://www.patreon.com/strangy" target="_blank" rel="external"><Lang key="layout.footer.social.links.patreon"/></a></p>
			</div>

			<div class="col m4 s12">
				<h5><Lang key="layout.footer.languages.heading"/></h5>
				{#each Object.keys(availableLangs) as key}
					<p><a href="/{key}/" rel="external">{availableLangs[key]}</a></p>
				{/each}
			</div>
		</div>
	</div>
	<p>&nbsp;</p>
</footer>
