<script>
import { onDestroy } from 'svelte'
import { current_user, auth_info } from '../../../../stores/current_user.js'
import AuthAPI from '../../../../api/providers/app/Auth';
import {lang_url} from "../../../general/link";
import {_lang} from "sickspack/multilang/lang";
import Lang from "sickspack/multilang/Lang.svelte";

</script>

<ul class="collapsible">
  <li>
    <div class="collapsible-header">
      <i class="material-icons" data-icon="more_vert"></i>
      {$auth_info.email ? $auth_info.email : '...'}
    </div>
    <div class="collapsible-body">
      <ul class="collection">
        <li>
        	<a href="{lang_url('my/settings')}" rel="nofollow">
        		<i class="material-icons" data-icon="settings"></i>
        		<Lang key="app.user_links.settings"/>
					</a>
				</li>
        <li>
        	<a href="{lang_url('my/logout')}" rel="nofollow">
        		<i class="material-icons" data-icon="logout"></i>
        		<Lang key="app.user_links.logout"/>
					</a>
				</li>
      </ul>
    </div>
  </li>
</ul>