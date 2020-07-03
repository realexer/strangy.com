import {TagsCollection} from "../../../firebase/app/collections";

class TagsAPI {
	static all(langs) {
		let query = TagsCollection;

		if (langs.length > 0) {
			query.where('lang', 'in', langs);
		}

		return query.orderBy('users_amount', "desc");
	};
}

export {TagsAPI};