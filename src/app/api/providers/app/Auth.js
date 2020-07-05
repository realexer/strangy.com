import {ApiResult} from "../../common/ApiResult";
import {Auth} from "../../../firebase/app";
import {UsersListAPI} from "./Users";
import {UserModel} from "../common/models/firebase/UserModel";
import {current_user, auth_info} from "../../../stores/current_user";
import ApiClient from "../../client";

Auth.onAuthStateChanged(async () =>
{
	if (Auth.currentUser)
	{
		const authInfo = {
			id: Auth.currentUser.uid,
			email: Auth.currentUser.email,
			idToken: await Auth.currentUser.getIdToken(),
		};

		auth_info.set(authInfo);

		const initUser = (attemptsLeft) =>
		{
			if (attemptsLeft === 0)
				return;

			// first try to find user record with given auth.user id
			UsersListAPI.byId(authInfo.id).get()
				.then(async doc =>
				{
					if (doc.exists)
					{
						current_user.set(doc.data());
					}
					else
					{
						await ApiClient.user.create();
						initUser(attemptsLeft);
					}
				}).catch((e) => {
				initUser(--attemptsLeft);
			}).finally(() => {

			});
		};

		initUser(3);

	} else {
		current_user.set(new UserModel());
		auth_info.set({});
	}
});


/**
 *
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