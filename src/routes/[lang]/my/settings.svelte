<script>
import { onMount, onDestroy } from 'svelte'

import Tags from '../../../app/components/main/user/settings/tags.svelte';
import Profile from '../../../app/components/main/user/settings/profile.svelte';
import Account from '../../../app/components/main/user/settings/account.svelte';
import {_lang} from "sickspack/multilang/lang";
import Lang from "sickspack/multilang/Lang.svelte";
import Metadata from "../../../app/components/general/Metadata.svelte";

let selectedSection = 'tags';

const selectSection = (section) => {
	selectedSection = section;
};

onMount(() => {
	M.Tabs.init(document.querySelector('.tabs'), {});
});

</script>

<Metadata page="my.settings"/>

<div>
	<ul class="tabs tabs-fixed-width tab-demo z-depth-1 no-autoinit">
		<li class="tab">
			<a href="#info"><i class="material-icons" data-icon="mode_edit"></i>
			 	<Lang key="pages.my.settings.tabs.tags.title"/>
			</a>
		</li>
		<li class="tab">
			<a href="#profile"><i class="material-icons" data-icon="person"></i>
			 	<Lang key="pages.my.settings.tabs.profile.title"/>
			</a>
		</li>
		<li class="tab">
			<a href="#account"><i class="material-icons" data-icon="settings"></i>
			 	<Lang key="pages.my.settings.tabs.account.title"/>
			</a>
		</li>
	</ul>
	<div class="" id="info">
		<div class="container"><Tags/></div>
	</div>
	<div class="" id="profile">
		<div class="container"><Profile/></div>
	</div>
	<div class="" id="account">
		<div class="container"><Account/></div>
	</div>
</div>