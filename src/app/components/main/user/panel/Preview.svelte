<script>
  import { onDestroy } from 'svelte'
  import { current_user } from '../../../../stores/current_user.js'
  import { Auth } from '../../../../api/Auth';
  import {lang_url} from "../../../general/link";


</script>

<ul class="collapsible">
  <li>
    <div class="collapsible-header">
      <i class="material-icons">more_vert</i>
      {$current_user.authInfo ? $current_user.authInfo.email : '...'}
    </div>
    <div class="collapsible-body">
      <ul class="collection">
        <li><a href="{lang_url('my/settings')}"><i class="material-icons">settings</i>settings</a></li>
        <li><a href="{lang_url('logout')}"><i class="material-icons">logout</i>logout</a></li>
      </ul>
    </div>
  </li>
</ul>