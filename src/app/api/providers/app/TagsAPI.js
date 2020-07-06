import {dbAccessorApp} from "../../../firebase/app";

class TagsAPI
{
	static all(langs)
	{
		let query = dbAccessorApp.tags();

		if (langs.length > 0) {
			query.where('lang', 'in', langs);
		}

		return query.orderBy('users_amount', "desc");
	};

	static findTag(tag, lang, kind)
	{
		return dbAccessorApp.tags()
			.where('tag', '==', tag)
			.where('lang', '==', lang)
			.where('kind', '==', kind);
	}

	static async getTagById(id)
	{
		return await dbAccessorApp.tags().doc(id).get();
	}
}

export {TagsAPI};