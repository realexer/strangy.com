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
}

export {TagsAPI};