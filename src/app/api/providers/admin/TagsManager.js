import {ApiResult} from "../../common/ApiResult";
import {dbAccessorAdmin} from "../../../firebase/admin";
import {isTagKindSupported, TagKind} from "../common/tags";
import {isLangSupported} from "../../../lang";
import {TagModel} from "../common/models/firebase/TagModel";
import {TagInput} from "../common/models/app/data_inputs/base/inputs/tag/TagInput";
import {LangInput} from "../common/models/app/data_inputs/base/inputs/lang/LangInput";
import {TagKindInput} from "../common/models/app/data_inputs/base/inputs/tag/TagKindInput";
import {DataInputCombined} from "../common/models/app/data_inputs/base/DataInput";

class TagsManager
{
	static async create(tag, lang, kind, creatorId)
	{
		return await ApiResult.fromPromise(async () =>
		{
			const tagData = {
				tag: new TagInput(tag),
				lang: new LangInput(lang),
				kind: new TagKindInput(kind),
				creator_id: creatorId,
				users_amount: 1,
				created_at: new Date()
			};

			const result = await dbAccessorAdmin.tags().add(new TagModel(new DataInputCombined(tagData).validated()));
			return new TagModel(tagData, result.id).toPlainObject();
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