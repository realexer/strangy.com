<script>
import IconPoint from '../../../app/components/ui/IconPoint.svelte'
import {_lang} from 'sickspack/multilang/lang'
import Lang from 'sickspack/multilang/Lang.svelte'
import Metadata from "../../../app/components/general/Metadata.svelte";
</script>

<Metadata page="info.involve"/>

<div class="container center-align">
	<h1 class=""><Lang key="pages.info.involve.heading"/></h1>
</div>
<div class="divider"></div>
<div class="container center-align">
	<IconPoint icon="" image="/icons/icons8-twitter.svg">
		<a href="https://twitter.com/strangycom" target="_blank"><Lang key="pages.info.involve.methods.twitter.heading"/></a>
		<p><Lang key="pages.info.involve.methods.twitter.description"/></p>
	</IconPoint>
	<IconPoint icon="" image="/icons/icons8-github.svg">
		<a href="https://github.com/realexer/strangy.com" target="_blank"><Lang key="pages.info.involve.methods.github.heading"/></a>
		<p><Lang key="pages.info.involve.methods.github.description"/></p>
	</IconPoint>
</div>


<div class="container center-align">
<p>Icons by <a target="_blank" href="https://icons8.com">Icons8</a></p>
</div>
