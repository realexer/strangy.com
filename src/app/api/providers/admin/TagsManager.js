import {ApiResult} from "../../common/ApiResult";
import {TagsCollection} from "../../../firebase/admin/collections";
import {firebase_admin} from "../../../firebase/admin";

class TagsManager
{
	static async create(tag, lang, kind, creatorId)
	{
		return await ApiResult.fromPromise(async () =>
		{
			const tagObj = {
				tag: tag,
				lang: lang,
				kind: kind,
				creator_id: creatorId,
				users_amount: 1,
				created_at: new Date()
			};

			return await TagsCollection.add(tagObj).id;
		});
	};

	static async incrementUsersAmount(tagId)
	{
		return await ApiResult.fromPromise(async () =>
		{
			return await TagsCollection.doc(tagId).update({
				users_amount: firebase_admin.firestore.FieldValue.increment(1)
			});
		});
	};

	static async decrementUsersAmount(tagId)
	{
		return await ApiResult.fromPromise(async () =>
		{
			return await TagsCollection.doc(tagId).update({
				users_amount: firebase_admin.firestore.FieldValue.increment(-1)
			});
		});
	};
}

export {TagsManager};