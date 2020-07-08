<script>

import Multilang from "sickspack/multilang";

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
				<h5>Languages</h5>
				{#each Object.keys(availableLangs) as key}
					<p><a href="/{key}/" rel="external">{availableLangs[key]}</a></p>
				{/each}
			</div>
		</div>
	</div>
	<p>&nbsp;</p>
	<div class="divider"></div>
</footer>