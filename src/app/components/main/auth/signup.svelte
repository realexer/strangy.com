<script>
    import PasswordInput from '../../../../lib/ui/components/forms/password_input.svelte'
    import EmailInput from '../../../../lib/ui/components/forms/email_input.svelte'
    import FormButtons from '../../../../lib/ui/components/forms/buttons.svelte'
    import { notificationMessage } from '../../../stores/notification_message.js'
    import { Auth } from '../../../firebase/index'
    import { FormController } from '../../../../lib/ui/FormController'

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

    const signupUser = () =>
    {
        formController.isBusy = true;

        formController.validate().then(() =>
        {
          return Auth.createUserWithEmailAndPassword(formController.getProp("email").value, formController.getProp("password").value)
          .then(() => {
              notificationMessage.set({ message: 'Howdy stranger!', type: 'green' });
          })
          .catch(error => {
              notificationMessage.set({ message: error.message, type: 'red' });
          });
        }).catch((e) => {});
    }
</script>

<form ref="form" on:submit|preventDefault={signupUser}>
  <EmailInput bind:value={formController.props["email"].value} error={formController.props["email"].error} isFocused={true} errorMessage={formController.props["email"].message} />
  <PasswordInput bind:value={formController.props["password"].value} error={formController.props["password"].error} errorMessage={formController.props["password"].message} />
  <FormButtons cancelButton={false} submitText="Sign Up" isLoading={formController.isBusy} />
</form>