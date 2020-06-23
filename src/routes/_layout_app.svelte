<script>
  import {onMount} from 'svelte'
  import {current_user} from '../stores/current_user'
  import {new_messages, new_invitations} from '../stores/user/notifications'
  import UserPanel from '../components/user/UserPanel.svelte'

  let sidenav = null;
  const themesList = {
    default: 'theme-default',
    night: 'dark'
  };

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
  });

  const setTheme = (value) => {
    theme = value;

    for(let key in themesList) {
      document.body.classList.remove(themesList[key]);
    }

    document.body.classList.add(theme);
  };

  const switchTheme = () =>
  {
    setTheme(theme === themesList.default ? themesList.night : themesList.default);
  };

</script>

<style global src='../style/theme.scss'></style>

<header>
  <nav>
    <div class="nav-wrapper">
      <ul class="left">
        <li><a href="#/random" class="">S</a></li>
        <li><a href="#/">Ready to chat</a></li>
        <li><a href="#/subjects">Subjects</a></li>
      </ul>


    </div>

  </nav>

  <div class="sidenav" id="user-side-menu">
    <UserPanel/>
  </div>
</header>
<main>

  <div class="app">
    <div class="container">
      <slot></slot>
    </div>
  </div>
</main>
