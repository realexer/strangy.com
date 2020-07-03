import {UsersListAPI} from "../../../../../../app/api/providers/app/Users";
import {ApiResult} from "../../../../../../app/api/common/ApiResult";
import {UserModel} from "../../../../../../app/api/providers/common/models/UserModel";
import {UserOperationsAPI} from "../../../../../../app/api/providers/admin/UserOperations";
import {TagsManager} from "../../../../../../app/api/providers/admin/TagsManager";

export async function post(req, res)
{
	const currentTagsIds = UserModel.fromDoc(await UsersListAPI.byId(req.body.user_id).get()).tags.all.map(t => t.id);
	const newTagsIds = req.body.tags.map(t => t.id);

	const tagsToIncrement = newTagsIds.filter(id => currentTagsIds.includes(id) === false);
	const tagsToDecrement = currentTagsIds.filter(id => newTagsIds.includes(id) === false);

	const results = [
		await UserOperationsAPI.instance(req.body.user_id).setTags(req.body.tags)
	];
	for(const id of tagsToIncrement) {
		results.push(await TagsManager.incrementUsersAmount(id))
	}
	for(const id of tagsToDecrement) {
		results.push(await TagsManager.decrementUsersAmount(id))
	}

	const result = ApiResult.fromMultiple(...results);

	res.send(result);
}