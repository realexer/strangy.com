import {ApiResult} from "../../common/ApiResult";
import {dbAccessorAdmin} from "../../../firebase/admin";
import {UserModel} from "../common/models/firebase/UserModel";

class UsersManger
{
	static async create(accountId)
	{
		const userData = {
			info: {
				langs: [],
				tags: [],
				filters: [],
				about: "",
			},
			settings: {
				is_open_for_chat: true,
				notifications: {
					email: false,
					push: false
				}
			},
			karma: 0,
			is_active: true,
			last_active_at: new Date(),
			created_at: new Date()
		};

		return await ApiResult.fromPromise(async () =>
		{
			return (await dbAccessorAdmin.users().doc(accountId).set(new UserModel(userData))).id;
		});
	};
}

export {UsersManger};