<script context="module">
import {set_lang, build_lang} from '../app/lang';
import langs from '../_langs';
import env from '../env';
import Notification from '../app/components/main/notification.svelte';
import { notificationMessage } from '../app/stores/notification_message.js'

export async function preload(page, session)
{
	const lang = page.path.split('/')[1];

	try {
		set_lang(lang);
	} catch(e) {
		this.redirect(302, '/en/');
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
	import LangBuilder from '../app/components/dev/LangBuilder.svelte';

	export let page;
	export let lang;

	set_lang(lang);

	console.log(page);

</script>

<svelte:head>
	{#each Object.keys(langs) as lang}
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
	<Nav lang="{lang}"/>
</header>

<main class:_ui_log_disabled={!env.dev.ui_log}>
	<slot></slot>
	<div class="container">&nbsp;</div>
</main>
{#if env.dev.lang_builder}
<LangBuilder/>
{/if}
<Footer lang="{lang}"/>