<script>
  import {onMount} from 'svelte'
  import {UserModel} from '../../api/models/UserModel'
  import {selected_stranger} from '../../stores/selected_strager'

  import InviteForm from './stranger/details/invite_form.svelte'
  import Chats from './stranger/details/chats.svelte'
  import Feedback from './stranger/details/feedback.svelte'

	let tabs = null;

  onMount(() => {
    tabs = M.Tabs.init(document.querySelector('.tabs'), {});
  });

  let listenToUser = null;

  let unsubscribe = selected_stranger.subscribe((selectedUser) =>
  {

  });

</script>

<div class="row">
  <div class="col s12 m4">
    <InviteForm/>
  </div>
  <div class="col s12 m8">

    <ul class="tabs no-autoinit">
      <li class="tab col m6"><a href="#stranger_feedback">Feedback</a></li>
      <li class="tab col m6"><a href="#stranger_chats">Chats</a></li>
    </ul>
    <div id="stranger_feedback" class="">
			<Feedback/>
    </div>
    <div id="stranger_chats" class="">
      <Chats/>
    </div>
  </div>
</div>