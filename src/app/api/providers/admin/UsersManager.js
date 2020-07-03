import {UsersCollection} from "../../../firebase/admin/collections";
import {ApiResult} from "../../common/ApiResult";

class UsersManger
{
	static async create(accountId)
	{
		const user = {
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
			return (await UsersCollection.doc(accountId).set()).id;
		});
	};
}

export {UsersManger};