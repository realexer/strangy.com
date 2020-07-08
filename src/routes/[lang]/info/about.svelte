<script>
import IconPoint from '../../../app/components/ui/IconPoint.svelte'
import {_lang} from 'sickspack/multilang/lang'
import Lang from 'sickspack/multilang/Lang.svelte'

</script>

<svelte:head>
	<title>{_lang("meta.about.title")}</title>
	<meta name="description" content='{_lang("meta.about.description")}'/>
</svelte:head>

<div class="container center-align">
	<h2><Lang key="pages.about.info.heading"/></h2>

	<IconPoint icon="language">
		<Lang key="pages.about.info.points.global"/>
	</IconPoint>

	<IconPoint icon="accessibility">
		<Lang key="pages.about.info.points.privacy"/>
	</IconPoint>

	<IconPoint icon="center_focus_weak">
		<Lang key="pages.about.info.points.simplicity"/>
	</IconPoint>

	<IconPoint icon="favorite_border">
		<Lang key="pages.about.info.points.quality"/>
	</IconPoint>
</div>

<div class="divider"></div>
<div class="container center-align">
	<h2><Lang key="pages.about.meta.heading"/></h2>

	<IconPoint icon="code">
		<Lang key="pages.about.meta.points.open_source"/>
	</IconPoint>
	<IconPoint icon="trending_up">
		<Lang key="pages.about.meta.points.tech_stack"/>
	</IconPoint>
	<IconPoint icon="money_off">
		<Lang key="pages.about.meta.points.transparency"/>
	</IconPoint>

</div>