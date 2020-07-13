<script context="module">
import env from '../env';
import Notification from '../app/components/ui/notification/notification.svelte';
import { notification_message } from '../app/stores/notification_message.js';
import Multilang from "sickspack/multilang";
import Lang from 'sickspack/multilang/Lang.svelte';
import {init} from '../app/init';
import {replaceUrlLang} from "../app/hreflang";

init();

const availableLangs = Multilang.getSupportedLanguages();

export async function preload(page, session)
{
	const langMatch = page.path.match(/\/(?<lang>[\w]+)\/?/);
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
import GoogleAnalytics from 'sickspack/GoogleAnalytics/GoogleAnalytics.svelte'
import { stores } from '@sapper/app';
import {auth_info, current_user} from "../app/stores/current_user";
import {Unsubscriby} from "sickspack/unsubscriby";
import {UsersListAPI} from "../app/api/providers/app/Users";

const app_stores = stores();

export let page;
export let lang;

Multilang.init(lang);

const unsubscriber = new Unsubscriby();

unsubscriber.add = auth_info.subscribe(() =>
{
	if($auth_info.id)
	{
		unsubscriber.addSingle(() =>
		{
			return UsersListAPI.byId($auth_info.id).subscribe((doc) => {
				current_user.set(doc.data());
			});
		}, 'current_user');
	}
})

</script>

<svelte:head>
	{#each Object.keys(availableLangs) as hrefLang}
	<link rel="alternate" hreflang="{hrefLang}" href="{env.baseUrl}{replaceUrlLang(page.path, lang, hrefLang)}" />
	{/each}
	<link rel="alternate" hreflang="x-default" href="{env.baseUrl}{replaceUrlLang(page.path, lang, 'en')}" />

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

<GoogleAnalytics gtag_id="G-G8267CJ27D" page="{app_stores.page}"/>

<header class:_ui_log_disabled={!env.dev.ui_log}>
	<Nav/>
</header>

<main class:_ui_log_disabled={!env.dev.ui_log}>
	<slot></slot>
</main>

<div class="warning">
	<div class="container center-align">
		<div class="">
			<Lang key="info.disclaimer"/>
		</div>
	</div>
</div>

<Footer/>