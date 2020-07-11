import {ApiResult} from "../../common/ApiResult";
import {dbAccessorAdmin} from "../../../firebase/admin";
import {TagModel} from "../common/models/firebase/TagModel";
import {TagInput} from "../common/models/app/data_inputs/base/inputs/tag/TagInput";
import {LangInput} from "../common/models/app/data_inputs/base/inputs/lang/LangInput";
import {TagKindInput} from "../common/models/app/data_inputs/base/inputs/tag/TagKindInput";
import {DataInputCombined} from "../common/models/app/data_inputs/base/DataInput";
import {TagsAPI} from "../app/TagsAPI";
import {TagObjectInput} from "../common/models/app/data_inputs/base/inputs/tag/TagObjectInput";

class TagsManager
{
	static async create(tag, lang, kind, creatorId)
	{
		return await ApiResult.fromPromise(async () =>
		{
			const tagData = new TagObjectInput({
				tag: tag,
				lang: lang,
				kind: kind,
				creator_id: creatorId,
				users_amount: 0,
				created_at: new Date()
			}).validated();

			const existingTag = await TagsAPI.findTag(tagData.tag, tagData.lang, tagData.kind).get();

			if(existingTag.docs.length > 0) {
				return existingTag.docs[0].data().toPlainObject();
			}

			const result = await dbAccessorAdmin.tags().add(new TagModel(tagData));

			return (await TagsAPI.getTagById(result.id)).data().toCompleteObject();
		});
	};

	static async incrementUsersAmount(tagId)
	{
		return await ApiResult.fromPromise(async () =>
		{
			return await dbAccessorAdmin.tags().doc(tagId).update({
				users_amount: dbAccessorAdmin.getFirebase().firestore.FieldValue.increment(1)
			});
		});
	};

	static async decrementUsersAmount(tagId)
	{
		return await ApiResult.fromPromise(async () =>
		{
			return await dbAccessorAdmin.tags().doc(tagId).update({
				users_amount: dbAccessorAdmin.getFirebase().firestore.FieldValue.increment(-1)
			});
		});
	};
}

export {TagsManager};