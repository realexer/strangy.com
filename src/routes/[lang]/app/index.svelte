<script>
  import { onMount, onDestroy } from 'svelte'
  import { current_user } from '../../../app/stores/current_user'
  import UsersList from '../../../app/components/main/UsersList/index.svelte'
</script>


<div class="left-align">
  <UsersList/>
</div>