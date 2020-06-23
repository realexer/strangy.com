<script>
  import { onDestroy } from 'svelte'
  import { current_user } from '../../stores/current_user.js'
  import { Auth } from '../../api/Auth';
  import {lang_url} from "../general/link";

  let authorized = null;
  let unsubscribe = false;

  $: if (!unsubscribe)
  {
    unsubscribe = current_user.subscribe(currentUser =>
    {
      if (currentUser && currentUser.id) {
        authorized = true;
      } else {
        authorized = false;
      }
    })
  }

  onDestroy(() => {
    unsubscribe()
  });

</script>

<div>
  {#if (authorized === null)}
  ...
  {:else}
    {#if authorized}
    <div class="">
      {$current_user.email}
      <a href="{lang_url('logout')}">logout</a>
    </div>
    {:else}
      <a href="{lang_url('login')}">login</a>
    {/if}
  {/if}
</div>