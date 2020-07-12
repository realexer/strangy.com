<script>
import {_lang} from "sickspack/multilang/lang";

export let page;
export let data = {};

const title = () =>
{
	let value = _lang(`meta.${page}.title`, data);

	if(page !== 'index') {
		value += ' - Strangy';
	}

	return value;
};

const description = () =>
{
	return _lang(`meta.${page}.description`, data);
};

</script>
<svelte:head>
	<title>{title()}</title>
	<meta name="description" content='{description()}'/>
</svelte:head>