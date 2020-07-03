import {ApiResult} from "../../common/ApiResult";
import {UsersCollection} from "../../../firebase/admin/collections";

class UserOperationsAPI {
	constructor(userId) {
		this.userId = userId;
	}

	static instance(userId) {
		return new UserOperationsAPI(userId);
	}

	async setLangs(langs) {
		return await ApiResult.fromPromise(async () => {
			if (Array.isArray(langs) === false) {
				throw 'Langs should be an array.';
			}

			return await UsersCollection.doc(this.userId).update({
				"info.langs": langs
			});
		});
	}

	async setTags(tags) {
		return await ApiResult.fromPromise(async () => {
			if (tags.length > 5) {
				throw 'Too many tags. Maximum 5 allowed.';
			}

			return await UsersCollection.doc(this.userId).update({
				"info.tags": tags
			});
		})
	};

	setKarma(karma) {
		return UsersCollection.doc(this.userId).update({
			karma: karma
		});
	};
}

export {UserOperationsAPI};