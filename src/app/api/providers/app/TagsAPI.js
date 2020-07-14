import {dbAccessorApp} from "../../../firebase/app";
import {Subscribable} from "../../common/Subscribable";

class TagsAPI
{
	static all(langs = [], kind = null, min_users_amount = 0)
	{
		let query = dbAccessorApp.tags();

		if (langs.length > 0) {
			query = query.where('lang', 'in', langs);
		}

		if(kind) {
			query = query.where('kind', '==', kind);
		}

		if(min_users_amount > 0) {
			query = query.where('users_amount', '>=', min_users_amount);
		}

		return query.orderBy('users_amount', "desc");
	};

	static findTag(tag, kind = null, lang = null)
	{
		let query =  dbAccessorApp.tags()
			.where('tag', '==', tag);

		if(kind) {
			query = query.where('kind', '==', kind);
		}

		if(lang) {
			query = query.where('lang', '==', lang);
		}

		return query.orderBy('users_amount', "desc");
	}

	static async getTagById(id)
	{
		return await dbAccessorApp.tags().doc(id).get();
	}

	static tagsById(idsList = [])
	{
		let query = dbAccessorApp.tags().where(dbAccessorApp.getFirebase().firestore.FieldPath.documentId(), 'in', idsList);

		return new Subscribable(query);
	}
}

export {TagsAPI};