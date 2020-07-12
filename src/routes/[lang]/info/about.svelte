<script>
import IconPoint from '../../../app/components/ui/IconPoint.svelte'
import {_lang} from 'sickspack/multilang/lang'
import Lang from 'sickspack/multilang/Lang.svelte'
import Metadata from "../../../app/components/general/Metadata.svelte";

</script>

<Metadata page="info.about"/>

<div class="container center-align">
	<h2><Lang key="pages.info.about.info.heading"/></h2>

	<IconPoint icon="language">
		<Lang key="pages.info.about.info.points.global"/>
	</IconPoint>

	<IconPoint icon="accessibility">
		<Lang key="pages.info.about.info.points.privacy"/>
	</IconPoint>

	<IconPoint icon="center_focus_weak">
		<Lang key="pages.info.about.info.points.simplicity"/>
	</IconPoint>

	<IconPoint icon="favorite_border">
		<Lang key="pages.info.about.info.points.quality"/>
	</IconPoint>
</div>

<div class="divider"></div>
<div class="container center-align">
	<h2><Lang key="pages.info.about.meta.heading"/></h2>

	<IconPoint icon="code">
		<Lang key="pages.info.about.meta.points.open_source"/>
	</IconPoint>
	<IconPoint icon="trending_up">
		<Lang key="pages.info.about.meta.points.tech_stack"/>
	</IconPoint>
	<IconPoint icon="money_off">
		<Lang key="pages.info.about.meta.points.transparency"/>
	</IconPoint>

</div>