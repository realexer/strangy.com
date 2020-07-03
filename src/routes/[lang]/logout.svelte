<script>
  import {onMount} from 'svelte'
  import { goto } from '@sapper/app';
  import { Auth } from '../../app/firebase/app'

  onMount(() =>
  {
    Auth.signOut().then(() => {
      goto("/");
    });
  });

</script>