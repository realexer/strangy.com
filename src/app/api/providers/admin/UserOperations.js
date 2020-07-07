import {ApiResult} from "../../common/ApiResult";
import {dbAccessorAdmin} from "../../../firebase/admin";
import {UserModel} from "../common/models/firebase/UserModel";
import {UsersListAPI} from "../app/Users";
import {TagsManager} from "./TagsManager";
import {LangsListInput} from "../common/models/app/data_inputs/base/inputs/lang/LangsListInput";
import {DataInputCombined} from "../common/models/app/data_inputs/base/DataInput";
import {TagInput} from "../common/models/app/data_inputs/base/inputs/tag/TagInput";
import {LangInput} from "../common/models/app/data_inputs/base/inputs/lang/LangInput";
import {TagKindInput} from "../common/models/app/data_inputs/base/inputs/tag/TagKindInput";
import {TagsAPI} from "../app/TagsAPI";
import {UserTagsListInput} from "../common/models/app/data_inputs/base/inputs/tag/UserTagsListInput";

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
			return await dbAccessorAdmin.users().doc(this.userId).update({
				"info.langs": new LangsListInput(langs).validated()
			});
		});
	}

	async updateUserTags(tags)
	{
		tags = new UserTagsListInput(tags).validated();

		for(let tagData of tags) {
			const existingTag = await TagsAPI.findTag(tagData.tag, tagData.lang, tagData.kind).get();

			if(existingTag.docs.length === 0) {
				throw `Tag [${tagData.tag}] is not found.`;
			}
		}

		const currentTagsIds = (await UsersListAPI.byId(this.userId).get()).data().tags.all.map(t => t.id);
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
		return await ApiResult.fromPromise(async () =>
		{
			return await dbAccessorAdmin.users().doc(this.userId).update({
				"info.tags": tags
			});
		})
	};
}

export {UserOperationsAPI};