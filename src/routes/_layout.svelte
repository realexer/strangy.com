<script context="module">
import env from '../env';
import Notification from '../app/components/ui/notification/notification.svelte';
import { notification_message } from '../app/stores/notification_message.js';
import translations from '../_langs/translations/index';
import Multilang from "sickspack/multilang";
import {addFormat} from 'sickspack/multilang/lang'
import Lang from 'sickspack/multilang/Lang.svelte'

Multilang.setup(translations);

addFormat(/\*\*([^*]+)\*\*/gmi, `<strong class='__txt_highlight'>$1</strong>`);
addFormat(/\*([^\*]+)\*/gmi, `<strong>$1</strong>`);
addFormat(/\n/gmi, `<p>`);

const availableLangs = Multilang.getSupportedLanguages();

export async function preload(page, session)
{
	const langMatch = page.path.match(/\/(<?lang>[\w]+)\/?/);
	const lang = langMatch ? langMatch.groups.lang : 'en';

	try {
		Multilang.init(lang);
	} catch(e) {
		this.redirect(301, '/');
	}

	return {
		lang: lang,
		page: page
	};
}
</script>

<script>
import {onMount} from 'svelte';
import Nav from '../app/components/layout/Nav.svelte';
import Footer from '../app/components/layout/Footer.svelte';
import GoogleAnalytics from '../lib/GoogleAnalytics/GoogleAnalytics.svelte'

export let page;
export let lang;

Multilang.init(lang);

</script>

<svelte:head>
	{#each Object.keys(availableLangs) as lang}
	<link rel="alternate" hreflang="{lang}" href="{env.baseUrl}/{lang}/" />
	{/each}
	<link rel="alternate" hreflang="x-default" href="{env.baseUrl}/en/" />

	<script async src="https://www.googletagmanager.com/gtag/js?id=G-G8267CJ27D"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-G8267CJ27D');
  </script>
</svelte:head>

<style global src='../styles/theme.scss'></style>

<Notification/>

<GoogleAnalytics gtag_id="G-G8267CJ27D"/>

<header class:_ui_log_disabled={!env.dev.ui_log}>
	<Nav/>
</header>

<main class:_ui_log_disabled={!env.dev.ui_log}>
	<slot></slot>

	<div class="warning">
		<div class="container center-align">
			<div class="">
				<Lang key="layout.main.disclaimer"/>
			</div>
		</div>
  </div>
</main>

<Footer/>