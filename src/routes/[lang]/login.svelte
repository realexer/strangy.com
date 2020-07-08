<script>
import { goto } from '@sapper/app';
import PasswordInput from '../../lib/ui/components/forms/password_input.svelte'
import EmailInput from '../../lib/ui/components/forms/email_input.svelte'
import FormButtons from '../../lib/ui/components/forms/buttons.svelte'
import { Auth } from '../../app/firebase/app'
import { FormController } from '../../lib/ui/FormController'
import * as ApiRequest from '../../app/api/ApiRequest';
import {ApiResult} from '../../app/api/common/ApiResult';
import AuthAPI from "../../app/api/providers/app/Auth";
import Lang from 'sickspack/multilang/Lang.svelte'
import {_lang} from 'sickspack/multilang/lang'
import UINotification from "../../app/components/ui/notification";

let formController = new FormController({
	email: {
		presence: true,
		email: true
	},
	password: {
		presence: true,
		length: {
			minimum: 6,
			message: _lang('cmp.form.rules.min_length', {num: 6})
		}
	}
});

formController.addProp("email");
formController.addProp("password");

const authorize = async (e) =>
{
	try {
		await formController.validate();

		const result = await AuthAPI.login(formController.getProp("email").value, formController.getProp("password").value);

		if(result.isSuccess()) {
			UINotification.success(_lang('pages.login.greeting'));
			goto("/");
		} else {
			throw result.getErrorMessage();
		}
	} catch (error) {
		UINotification.error(error.toString());
	}
};

</script>

<div class="container center-align">
	<h1 class="flow-text">
		<Lang key="pages.login.heading"/>
	</h1>
	<form ref="form" on:submit|preventDefault={authorize}>
		<EmailInput bind:value={formController.props["email"].value}
								label="{_lang('pages.login.form.email')}"
								error={formController.props["email"].error}
								isFocused={true}
								errorMessage={formController.props["email"].message} />
		<PasswordInput bind:value={formController.props["password"].value}
								label="{_lang('pages.login.form.password')}"
								error={formController.props["password"].error}
								errorMessage={formController.props["password"].message} />
		<FormButtons id="login-button"
								cancelButton={false}
								submitText="{_lang('pages.login.form.submit')}"
								isLoading={formController.isBusy} />
	</form>
</div>