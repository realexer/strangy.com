import { goto } from '@sapper/app';
import {ApiResult} from "../../common/ApiResult";
import {Auth} from "../../../firebase/app";
import {UsersListAPI} from "./Users";
import {UserModel} from "../common/models/firebase/UserModel";
import {current_user, auth_info} from "../../../stores/current_user";
import ApiClient from "../../client";
import {lang_url} from "../../../components/general/link";

let _newUser = false;

Auth.onAuthStateChanged(async () =>
{
	_newUser = false;

	if (Auth.currentUser)
	{
		const authInfo = {
			id: Auth.currentUser.uid,
			email: Auth.currentUser.email,
			idToken: await Auth.currentUser.getIdToken(),
		};

		auth_info.set(authInfo);

		const initUser = async (attemptsLeft) =>
		{
			if (attemptsLeft === 0)
				return;

			try {
				const doc = await UsersListAPI.byId(authInfo.id).get();

				if(doc.exists) {
					current_user.set(doc.data());

					await ApiClient.user.info.setOnline();

					if(_newUser) {
						goto(lang_url('app/intro'));
					}
				}
				else
				{
					_newUser = true;

					await ApiClient.user.create();
					await initUser(attemptsLeft);
				}
			} catch(e) {
				await initUser(--attemptsLeft);
				console.log(e);
			}
		};

		await initUser(3);

	} else {
		current_user.set(new UserModel());
		auth_info.set({});
	}
});


/**
 * Using promises here for a reason, can exactly remember why
 * @param email
 * @param password
 * @returns {Promise<ApiResult>}
 */
const login = async (email, password) => {
	const result = new ApiResult();

	return Auth.createUserWithEmailAndPassword(email, password)
		.then((data) => {
			result.setSuccess(data);
			return result;
		})
		.catch((error) => {

			if (error.code === 'auth/email-already-in-use') {
				return Auth.signInWithEmailAndPassword(email, password)
					.then((data) => {
						result.setSuccess(data);
						return result;
					})
					.catch((error) => {
						result.setError(error.code);
						return result;
					});
			} else {
				result.setError(error.code);
			}

			return result;
		});
};

const AuthAPI =
{
	login: login
};

export default AuthAPI;