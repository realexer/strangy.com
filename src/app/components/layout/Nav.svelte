<script>
import {stores} from "@sapper/app";
import {onMount} from 'svelte';
import env from '../../../env';
import {_lang} from 'sickspack/multilang/lang';
import Lang from 'sickspack/multilang/Lang.svelte';

import {current_user} from '../../stores/current_user'
import {new_messages, new_invitations} from '../../stores/user/notifications'
import UserPanel from '../../components/main/user/UserPanel.svelte';
import {lang_url} from "../general/link";

const { page } = stores();

let sidenav = null;

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
			<li class:active="{$page.path == lang_url()}">
				<a href="{lang_url()}" title="{_lang('layout.nav.links.home.title')}">
					<span class="brand-logo" style="position: relative;">S<span class="hide">trangy</span></span>
				</a>
			</li>
			<li class:active="{$page.path == lang_url('info/about')}">
				<a href="{lang_url('info/about')}" title="{_lang('layout.nav.links.about.title')}">
					<span class="hide-on-small-and-down"><Lang key="layout.nav.links.about.text"/></span>
					<i class="material-icons hide-on-med-and-up" data-icon="info_outline"></i>
				</a>
			</li>
			<li class:active="{$page.path == lang_url('info/involve')}" class="hide-on-small-and-down">
				<a href="{lang_url('info/involve')}" title="{_lang('layout.nav.links.involve.title')}">
					<span class=""><Lang key="layout.nav.links.involve.text"/></span>
					<i class="material-icons hide-on-med-and-up" data-icon="touch_app"></i>
				</a>
			</li>
		</ul>
		<ul class="right show-on-large">
			<li class="sidenav-close hide-on-med-and-down" on:click="{ () => {sidenav.close()}}">
				<i class="material-icons" data-icon="close"></i>
			</li>
			{#if $current_user.id}
			<li class="show-on-large">
				<a href="{lang_url('my/feedback')}" rel="nofollow" class="">
					<i class="material-icons right" data-icon="favorite"></i>
					{$current_user.karma}
				</a>
			</li>
			<li data-target="user-side-menu" class="sidenav-trigger show-on-large">
				<a href="#!" rel="nofollow">
					{#if (($new_messages.amount + $new_invitations.amount) > 0) }
						<button class="btn green">{$new_messages.amount + $new_invitations.amount}</button>
					{:else}
						<i class="material-icons">menu</i>
					{/if}
				</a>
			</li>
			{:else}
			<li>
				<a href="{lang_url('login')}" class="" title="{_lang('layout.nav.links.login.title')}">
					<i class="material-icons left" data-icon="person_add"></i>
					<span class="hide-on-small-and-down"><Lang key="layout.nav.links.login.text"/></span>
				</a>
			</li>
			{/if}
		</ul>
	</div>
</nav>

<div class="sidenav" id="user-side-menu">
	<UserPanel/>
</div>