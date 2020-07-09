<script context="module">

export async function preload(page, session)
{
	return {};
}

</script>
<script>
import {onMount, onDestroy} from 'svelte';
import {UsersListAPI} from '../../../app/api/providers/app/Users';
import {UserModel} from '../../../app/api/providers/common/models/firebase/UserModel';
import { selected_stranger } from '../../../app/stores/selected_strager.js';
import Stranger from '../../../app/components/main/Stranger.svelte';
import { stores } from '@sapper/app';
import {Unsubscriby} from "sickspack/unsubscriby";

const {page} = stores();

const unsubscriber = new Unsubscriby(onDestroy);


unsubscriber.add = page.subscribe(async (page) =>
{
	$selected_stranger = (await UsersListAPI.byId(page.params.user_id).get()).data();
});


</script>

<div class="container">
	<Stranger user="{$selected_stranger}"/>
</div>