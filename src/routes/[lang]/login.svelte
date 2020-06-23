<script>
  import { goto } from '@sapper/app';
  import PasswordInput from '../../lib/ui/components/forms/password_input.svelte'
  import EmailInput from '../../lib/ui/components/forms/email_input.svelte'
  import FormButtons from '../../lib/ui/components/forms/buttons.svelte'
  import { notificationMessage } from '../../app/stores/notification_message.js'
  import { Auth } from '../../app/firebase'
  import { FormController } from '../../lib/ui/FormController'

  let formController = new FormController({
    email: {
      presence: true,
      email: true
    },
    password: {
      presence: true,
      length: {
        minimum: 6,
        message: 'must be at least 6 characters'
      }
    }
  });

  formController.addProp("email");
  formController.addProp("password");

  const authorize = (e) =>
  {
    formController.validate().then(() =>
    {
      return Auth.createUserWithEmailAndPassword(formController.getProp("email").value, formController.getProp("password").value)
      .then(() => {
          notificationMessage.set({ message: 'Howdy stranger!', type: 'green' });
          goto("/");
      })
      .catch(error =>
      {
        if(error.code === 'auth/email-already-in-use')
        {
          return Auth.signInWithEmailAndPassword(formController.getProp("email").value, formController.getProp("password").value)
          .then(() => {
              notificationMessage.set({ message: 'Welcome back!', type: 'success-toast' });
              goto("/");
          })
          .catch(error => {
              notificationMessage.set({ message: error.message, type: 'danger-toast' });
          });

        } else {
          notificationMessage.set({ message: error.message, type: 'red' });
        }
      });
    });
  };

</script>

<div class="container center-align">
	<h1 class="flow-text">Login or Create Account</h1>
	<form ref="form" on:submit|preventDefault={authorize}>
		<EmailInput bind:value={formController.props["email"].value} error={formController.props["email"].error} isFocused={true} errorMessage={formController.props["email"].message} />
		<PasswordInput bind:value={formController.props["password"].value} error={formController.props["password"].error} errorMessage={formController.props["password"].message} />
		<FormButtons id="login-button" cancelButton={false} submitText="Login" isLoading={formController.isBusy} />
	</form>
</div>