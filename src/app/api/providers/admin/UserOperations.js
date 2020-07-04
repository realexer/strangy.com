import {ApiResult} from "../../common/ApiResult";
import {dbAccessorAdmin} from "../../../firebase/admin";

class UserOperationsAPI
{
	constructor(userId)
	{
		this.userId = userId;
	}

	static instance(userId)
	{
		return new UserOperationsAPI(userId);
	}

	async setLangs(langs)
	{
		return await ApiResult.fromPromise(async () =>
		{
			if (Array.isArray(langs) === false) {
				throw 'Langs should be an array.';
			}

			return await dbAccessorAdmin.users().doc(this.userId).update({
				"info.langs": langs
			});
		});
	}

	async setTags(tags)
	{
		return await ApiResult.fromPromise(async () => {
			if (tags.length > 5) {
				throw 'Too many tags. Maximum 5 allowed.';
			}

			return await dbAccessorAdmin.users().doc(this.userId).update({
				"info.tags": tags
			});
		})
	};

	setKarma(karma)
	{
		return dbAccessorAdmin.users().doc(this.userId).update({
			karma: karma
		});
	};
}

export {UserOperationsAPI};