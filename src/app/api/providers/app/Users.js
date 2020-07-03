import {UsersCollection} from "../../../firebase/app/collections";
import {Subscribable} from "../../common/Subscribable";
import {firebase} from "../../../firebase/app";

class UsersListAPI {
	static byId(userId) {
		let query = UsersCollection.doc(userId);

		return new Subscribable(query);
	};

	static activeUsers() {
		let query = UsersCollection.where('is_active', '==', true);
		query.orderBy('last_active_at', 'desc');

		return new Subscribable(query);
	};

	static usersById(idsList) {
		let query = UsersCollection.where(firebase.firestore.FieldPath.documentId(), 'in', idsList);

		return new Subscribable(query);
	}
}

export {UsersListAPI};