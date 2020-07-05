import {ApiResult} from "../../common/ApiResult";
import {dbAccessorAdmin} from "../../../firebase/admin";
import {isTagKindSupported, TagKind} from "../common/tags";
import {isLangSupported} from "../../../lang";
import {TagModel} from "../common/models/firebase/TagModel";

const validateTag = (tag) =>
{
	tag = tag.trim().toLowerCase();

	if(tag.length < 3) {
		throw 'Tag should be at least 3 characters long.'
	}

	if(tag.length > 15) {
		throw 'Tag should be less than 15 characters long.'
	}

	tag = tag.replace(/[^\w0-9]+/g, '-').replace(/^-*|-*$/g, '');

	return tag;
};

class TagsManager
{
	static async create(tag, lang, kind, creatorId)
	{
		return await ApiResult.fromPromise(async () =>
		{
			tag = validateTag(tag);

			if(isTagKindSupported(kind) === false) {
				throw `Tag kind [${kind}] is not supported.`;
			}

			if(isLangSupported(lang) === false) {
				throw `Lang [${lang}] is not supported.`;
			}

			const tagData = {
				tag: tag,
				lang: lang,
				kind: kind,
				creator_id: creatorId,
				users_amount: 1,
				created_at: new Date()
			};

			const result = await dbAccessorAdmin.tags().add(new TagModel(tagData));
			return {
				id: result.id,
				tag: tag
			};
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