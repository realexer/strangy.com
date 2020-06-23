<script>
  import {onMount} from 'svelte'
  import { goto } from '@sapper/app';
  import { Auth } from '../../app/firebase'

  onMount(() =>
  {
    Auth.signOut().then(() => {
      goto("/");
    });
  });

</script>