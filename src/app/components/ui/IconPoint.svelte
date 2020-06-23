<script>
export let icon = null;
export let image = null;
export let image_alt = image;
</script>

<div class="row icon-point">
	<div class="col s3 white-text">
		{#if icon}
		<p class="">
			<span class="hide-on-med-and-up"><i class="material-icons medium">{icon}</i></span>
			<span class="hide-on-small-only"><i class="material-icons large">{icon}</i></span>
		</p>
		{/if}
		{#if image}
		<p class="flow-text">
			<i class="material-icons large"><img class="image" alt="{image_alt}" src="{image}"/></i>
		</p>
		{/if}
	</div>
	<div class="col s9">
		<p class="flow-text left-align">
			<slot></slot>
		</p>
	</div>
</div>