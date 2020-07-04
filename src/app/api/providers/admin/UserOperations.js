import {ApiResult} from "../../common/ApiResult";
import {dbAccessorAdmin} from "../../../firebase/admin";
import {UserModel} from "../common/models/UserModel";
import {UsersListAPI} from "../app/Users";
import {TagsManager} from "./TagsManager";

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

	async updateUserTags(tags)
	{
		const currentTagsIds = UserModel.fromDoc(await UsersListAPI.byId(this.userId).get()).tags.all.map(t => t.id);
		const newTagsIds = tags.map(t => t.id);

		const tagsToIncrement = newTagsIds.filter(id => currentTagsIds.includes(id) === false);
		const tagsToDecrement = currentTagsIds.filter(id => newTagsIds.includes(id) === false);

		const results = [
			await this.setTags(tags)
		];
		for(const id of tagsToIncrement) {
			results.push(await TagsManager.incrementUsersAmount(id))
		}
		for(const id of tagsToDecrement) {
			results.push(await TagsManager.decrementUsersAmount(id))
		}

		return ApiResult.fromMultiple(...results);
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