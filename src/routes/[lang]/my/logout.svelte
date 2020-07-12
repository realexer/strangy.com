<script>
import {onMount} from 'svelte'
import { goto } from '@sapper/app';
import { Auth } from '../../../app/firebase/app';
import Lang from 'sickspack/multilang/Lang.svelte';
import ApiClient from "../../../app/api/client";
import Metadata from "../../../app/components/general/Metadata.svelte";

onMount(async () =>
{
	await ApiClient.user.info.setOffline();
	await Auth.signOut();
	goto("/");

});
</script>

<Metadata page="my.logout"/>

<div class="container center-align">
	<h1 class="flow-text">
		<Lang key="pages.my.logout.heading"/>
	</h1>
</div>