<script>
import {onMount} from 'svelte'
import {UsersListAPI} from '../../../api/providers/app/Users';
import {UserModel} from '../../../api/providers/common/models/firebase/UserModel';
import {FilterTagsList} from './FilterData';
import {FilterData} from './FilterData';

import {selected_stranger} from '../../../stores/selected_strager';
import {lang_url} from "../../general/link";
import { fade } from 'svelte/transition';
import {_lang} from "sickspack/multilang/lang";
import Lang from "sickspack/multilang/Lang.svelte";

export let activeUsers;

const filterData = new FilterData();
filterData.putData(activeUsers);

let totalUsersAmount = filterData.getTotalUsersAmount();
let usersFiltered = filterData.filterUsers([]);
let tags = filterData.getTagsArray();
let changedAmount = -1;
let tagsToFilter = [];

const filterUsers = () =>
{
  usersFiltered = filterData.filterUsers(tagsToFilter);
  changedAmount = 0;
};

const addTagToFilter = (tag) =>
{
  tagsToFilter = [...tagsToFilter, tag.tag];

  filterUsers();
};

const removeTagToFilter = (tag) =>
{
  tagsToFilter = tagsToFilter.filter((item) => {
    return item !== tag;
  });

  filterUsers();
};


onMount(() =>
{
	M.Collapsible.init(document.querySelector('.collapsible.expandable'), {
    accordion: false
  });

	changedAmount = -1;

  UsersListAPI.activeUsers().subscribe(result =>
  {
  	filterData.reset();
  	filterData.putData(result.docs.map(d => d.data()));

    tags = filterData.getTagsArray();
    totalUsersAmount = filterData.getTotalUsersAmount();

    changedAmount++;
  });
});

let users_list_filter_visible = false;


</script>

<div class="row">
	<div class="col m8 s12">
		<h2 class="flow-text">
			<Lang key="app.index.tags_list.heading"/>
		</h2>
		{#if tagsToFilter.length > 0}
    <p class="">
			{#each tagsToFilter as tag}
			<div class="__tag chip activator green" on:click="{() => {removeTagToFilter(tag)}}">
				{tag}
			</div>
			{/each}
		</p>
		{/if}
		<p class="">
			{#each tags as tag}
			<a href="{lang_url(`tag/${tag.kind}/${tag.tag}`)}"
					class="__tag chip"
					on:click|preventDefault="{() => {addTagToFilter(tag)}}">
				{tag.tag}
				<i class="">{tag.users_amount}</i>
			</a>
			{/each}
		</p>

  </div>
  <div class="col m4 s12 __users_list">
  	<div class="">

			<button class="btn-flat right" on:click="{() => {users_list_filter_visible = !users_list_filter_visible;}}">
				<i class="material-icons right" data-icon="more_vert"></i>
			</button>
			<h2 class="flow-text"><Lang key="app.index.users_list.heading" data="{{amount: usersFiltered.length}}"/></h2>

  		<div class="clearfix"></div>
  	</div>
  	{#if users_list_filter_visible}
  	<div class="_options_list" transition:fade>
			<div class="_option">
				<input type="checkbox">
				<Lang key="app.index.users_list.options.first"/>
			</div>
			<div class="_option">
				<input type="checkbox">
				<Lang key="app.index.users_list.options.second"/>
			</div>

		</div>
		{/if}
		{#if changedAmount > 0}
		<div class="container center-align">
			<button class="btn-flat" on:click="{() => {filterUsers()}}">
				<i class="material-icons" data-icon="refresh"></i>
			</button>
		</div>
		{/if}
    <ul class="collapsible expandable no-autoinit">
      {#each usersFiltered as user}
      <li class="">
        <div class="collapsible-header">
					<div class="_user_info">
						<a href="{lang_url('user/'+user.id)}">{user.tags.primary.string}</a>
						<p class="">{user.tags.secondary.string}</p>

						<span class="_karma center-align">
							{#if user.karma > 0}
							<span>{user.karma}</span>
							<i class="material-icons right" data-icon="favorite"></i>
							{:else}
							<i class="material-icons right" data-icon="favorite_border"></i>
							{/if}
						</span>
					</div>
        </div>

        <div class="collapsible-body">
        	<div class="row">
        		{#if user.about}
        		<p class="flow-text">{user.about}</p>
        		{/if}
						<div class="">
							<a class="btn btn-block"
								 href="{lang_url('user/'+user.id)}"
								 on:click="{ () => { $selected_stranger = user; } }">
								 	<Lang key="app.index.users_list.user_item.chat"/>
							</a>
						</div>
					</div>
        </div>
      </li>
      {/each}
    </ul>
  </div>
</div>