<script>
	import {goto, stores} from "@sapper/app";
	import {onMount} from 'svelte';
	import env from '../../../env';
	import langs from '../../../_langs';
	import Lang from '../../lang.svelte'

	import {current_user} from '../../stores/current_user'
	import {new_messages, new_invitations} from '../../stores/user/notifications'
	import UserPanel from '../../components/main/user/UserPanel.svelte';
	import {lang_url} from "../general/link";

	const { page } = stores();

	export let lang;

	let sidenav = null;

	let theme = 'theme-default';

	onMount(() =>
	{
		M.AutoInit();

		sidenav = M.Sidenav.init(document.querySelector('.sidenav'), {
			edge: 'right',
			draggable: true,
			onOpenStart: () => {
				document.querySelectorAll('body').forEach((el) => {
					el.classList.add('sidenav-open');
				});
			},
			onCloseEnd: () => {
				document.querySelectorAll('body').forEach((el) => {
					el.classList.remove('sidenav-open');
				});
			}
		});

		page.subscribe(() =>
		{
			sidenav.close();
		});
	});


</script>


<nav class="">
	<div class="nav-wrapper">
		<ul class="">
			<li class:active="{$page.path == `/${lang}/`}"><a href='/{lang}/'><span class="brand-logo" style="position: relative;">S</span></a></li>
			<li class:active="{$page.path == `/${lang}/about`}"><a href='/{lang}/about'><Lang key="components.nav.links.about"/></a></li>
			<li class:active="{$page.path == `/${lang}/involve`}"><a href='/{lang}/involve'><Lang key="components.nav.links.involve"/></a></li>
		</ul>
		<ul class="right show-on-large">

			{#if env.dev.app_preview}
				<li class="sidenav-close hide-on-med-and-down" on:click="{ () => {sidenav.close()}}">
					<i class="material-icons">close</i>
				</li>
				{#if $current_user.id}
				<li class="show-on-large">
					<a href="/{lang}/my/feedback" class="">
						<i class="material-icons left tiny" data-icon="favorite"></i>
						{$current_user.karma}
					</a>
				</li>
				<li data-target="user-side-menu" class="sidenav-trigger show-on-large">
					<a href="#!">
						{#if (($new_messages.amount + $new_invitations.amount) > 0) }
							<button class="btn green">{$new_messages.amount + $new_invitations.amount}</button>
						{:else}
							<i class="material-icons">menu</i>
						{/if}
					</a>
				</li>
				{:else}
				<li>
					<a href="{lang_url('login')}" class="">
						<i class="material-icons">person</i>
					</a>
				</li>
				{/if}
			{/if}
		</ul>
	</div>
</nav>

<ul id="langs_selector" class="dropdown-content">
	{#each Object.keys(langs) as lang}
  <li><a href="/{lang}/" on:click|preventDefault="{() => {changeLang(lang);}}">{langs[lang].lang}</a></li>
  {/each}
</ul>

<div class="sidenav" id="user-side-menu">
	<UserPanel/>
</div>