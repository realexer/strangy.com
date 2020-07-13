<script>
import TagsSelector from '../../../app/components/main/user/settings/tags/Selector.svelte';
import NewTagForm from '../../../app/components/main/user/settings/tags/NewTagForm.svelte';
import {lang_url} from "../../../app/components/general/link";
import Metadata from "../../../app/components/general/Metadata.svelte";
import {_lang} from "sickspack/multilang/lang";
import Lang from "sickspack/multilang/Lang.svelte";
</script>

<Metadata page="app.intro"/>

<div class="container center-align">
  <h1 class=""><Lang key="pages.app.intro.heading"/></h1>
</div>
<div class="divider"></div>
<div class="container">
	<TagsSelector/>
</div>
<div class="divider"></div>
<div class="container center-align">
	<p class="flow-text">
		<a href="{lang_url()}" class="btn btn-large"><Lang key="pages.app.intro.home_button"/></a>
	</p>
</div>