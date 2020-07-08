<script>

import Multilang from "sickspack/multilang";
import Lang from 'sickspack/multilang/Lang.svelte'

export let lang;

const availableLangs = Multilang.getSupportedLanguages();

</script>

<footer class="page-footer">
	<div class="container">
		<div class="row">
			<div class="col m4">

			</div>

			<div class="col m4">

			</div>

			<div class="col m4">
				<h5><Lang key="layout.footer.languages.heading"/></h5>
				{#each Object.keys(availableLangs) as key}
					<p><a href="/{key}/" rel="external">{availableLangs[key]}</a></p>
				{/each}
			</div>
		</div>
	</div>
	<p>&nbsp;</p>
</footer>