<script>
  import { onMount, onDestroy } from 'svelte'

  import Tags from '../../../app/components/main/user/settings/tags.svelte'
  import Profile from '../../../app/components/main/user/settings/profile.svelte'
  import Account from '../../../app/components/main/user/settings/account.svelte'

  let selectedSection = 'tags';

  const selectSection = (section) => {
    selectedSection = section;
  };

  onMount(() => {
		M.Tabs.init(document.querySelector('.tabs'), {});
	});

</script>

<div>
	<ul class="tabs tabs-fixed-width tab-demo z-depth-1 no-autoinit">
		<li class="tab">
			<a href="#info"><i class="material-icons">mode_edit</i> Info</a>
		</li>
		<li class="tab">
			<a href="#profile"><i class="material-icons">person</i> Profile</a>
		</li>
		<li class="tab">
			<a href="#account"><i class="material-icons">settings</i> Account</a>
		</li>
	</ul>
	<div class="" id="info">
		<div class="container"><Tags/></div>
	</div>
	<div class="" id="profile">
		<div class="container"><Profile/></div>
	</div>
	<div class="" id="account">
		<div class="container"><Account/></div>
	</div>
</div>

<div class="container hide">

	<div class="row">
		<div class="col m1">
			<ul class="collection">
				<li class="collection-item" on:click="{() => { selectSection('profile');}}">
					<i class="material-icons">profile</i>
				</li>
				<li class="collection-item" on:click="{() => { selectSection('tags');}}">
					<i class="material-icons">info</i>
				</li>
				<li class="collection-item" on:click="{() => { selectSection('account');}}">
					<i class="material-icons">settings</i>
				</li>
			</ul>
		</div>
		<div class="col m11">
			{#if selectedSection == 'tags'}
				<div class="">

					<Tags/>
				</div>
			{/if}

			{#if selectedSection == 'profile'}
				<div class="">

					<Profile/>
				</div>
			{/if}

			{#if selectedSection == 'account'}
				<div class="">

					<Account/>
				</div>
			{/if}
		</div>
	</div>
</div>