<script context="module">

import {preloadActiveUsers} from "../app/ssr/acitve_users";
export async function preload(page, session)
{
	return {
		activeUsers: await preloadActiveUsers()
	};
}
</script>

<script>
import Index from './[lang]/index.svelte'

export let activeUsers;

</script>
<Index activeUsers="{activeUsers}"/>