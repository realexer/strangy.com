<script>

import langs from '../../../_langs';

export let lang;

</script>

<footer class="page-footer">
	<div class="container">
		<div class="row">
			<div class="col m4">

			</div>

			<div class="col m4">

			</div>

			<div class="col m4">
				<h5>Other languages</h5>
				{#each Object.keys(langs) as l}
					{#if l != lang}
					<p><a href="/{lang}/">{langs[l].lang}</a></p>
					{/if}
				{/each}
			</div>
		</div>
	</div>
	<p>&nbsp;</p>
	<div class="divider"></div>
</footer>