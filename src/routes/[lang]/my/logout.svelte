<script>
import {onMount} from 'svelte'
import { goto } from '@sapper/app';
import { Auth } from '../../../app/firebase/app'
import Lang from 'sickspack/multilang/Lang.svelte'

onMount(() =>
{
	Auth.signOut().then(() => {
		goto("/");
	});
});
</script>

<div class="container center-align">
	<h1 class="flow-text">
		<Lang key="pages.my.logout.heading"/>
	</h1>
</div>