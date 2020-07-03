<script context="module">

export async function preload(page, session)
{
	return {
		userId: page.params.uid
	};
}

</script>
<script>
import {onMount} from 'svelte';
import {UsersListAPI} from '../../../app/api/providers/app/Users'
import {UserModel} from '../../../app/api/providers/common/models/UserModel'
import { selected_stranger } from '../../../app/stores/selected_strager.js'

import Stranger from '../../../app/components/main/Stranger.svelte'

export let userId;


onMount(() =>
{
	if($selected_stranger.id === undefined)
  {
  	UsersListAPI.byId(userId).get().then((doc) => {
  		$selected_stranger = UserModel.fromDoc(doc);
  	});
  }
});

</script>

<div class="container">
	<Stranger user="{$selected_stranger}"/>
</div>