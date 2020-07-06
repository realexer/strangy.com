<script>
import {onMount} from 'svelte'
import {UsersListAPI} from '../../../api/providers/app/Users';
import {UserModel} from '../../../api/providers/common/models/firebase/UserModel';
import {FilterTagsList} from './FilterData';
import {FilterData} from './FilterData';

import {selected_stranger} from '../../../stores/selected_strager';
import {lang_url} from "../../general/link";
import { fade } from 'svelte/transition';

const filterData = new FilterData();

let totalUsersAmount = 0;
let changedAmount = -1;
let usersFiltered = [];
let tags = [];
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

  UsersListAPI.activeUsers().subscribe(result =>
  {
  	filterData.reset();
  	filterData.putData(result.docs);

    tags = filterData.getTagsArray();
    totalUsersAmount = filterData.getTotalUsersAmount();

    if(changedAmount < 0) {
    	filterUsers();
    } else {
    	changedAmount++;
    }
  });
});

let users_list_filter_visible = false;


</script>

<div class="row">
	<div class="col m8 s12">
		<p class="flow-text">Select who you'd like to chat with</p>
		{#if tagsToFilter.length > 0}
    <div>
		{#each tagsToFilter as tag}
			<div class="chip activator green" on:click="{() => {removeTagToFilter(tag)}}">
				{tag}
			</div>
			{/each}
		</div>
		<div class="divider"></div>
		{/if}
		{#each tags as tag}
		<div class="chip activator" on:click="{() => {addTagToFilter(tag)}}">
			{tag.tag}
			<i class="">{tag.users_amount}</i>
		</div>
		{/each}

  </div>
  <div class="col m4 s12 __users_list">
  	<div class="">
  		<p class="flow-text">
  			{totalUsersAmount} ready to chat
  			<i class="material-icons right" on:click="{() => {users_list_filter_visible = !users_list_filter_visible;}}">more_vert</i>
  		</p>
  	</div>
  	{#if users_list_filter_visible}
  	<div class="_options_list" transition:fade>
			<div class="">some options will appear here</div>
			<div class="_option"><input type="checkbox">option 1</div>
			<div class="_option"><input type="checkbox">option 2</div>
		</div>
		{/if}
    <ul class="collapsible expandable no-autoinit">
      {#if changedAmount > 0}
      <li class="center">
        <i class="material-icons" on:click="{() => {filterUsers()}}">refresh</i>
      </li>
      {/if}
      {#each usersFiltered as user}
      <li class="">
        <div class="collapsible-header">
					<div class="_user_info">
						<a href="{lang_url('user/'+user.id)}">{user.tags.primary.string}</a>
						<p class="">{user.tags.secondary.string}</p>
						<span class="_karma">{user.karma}</span>
					</div>
        </div>

        <div class="collapsible-body">
        	<div class="row">
        		<div class="">{user.about}</div>
						<div class="">
							<a class="btn"
								 href="{lang_url('user/'+user.id)}"
								 on:click="{ () => { $selected_stranger = user; } }">Chat</a>
						</div>
					</div>
        </div>
      </li>
      {/each}
    </ul>
  </div>
</div>