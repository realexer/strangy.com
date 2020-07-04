import {Subscribable} from "../../common/Subscribable";
import {dbAccessorApp} from "../../../firebase/app";

class UsersListAPI
{
	static byId(userId)
	{
		let query = dbAccessorApp.users().doc(userId);

		return new Subscribable(query);
	};

	static activeUsers()
	{
		let query = dbAccessorApp.users().where('is_active', '==', true);
		query.orderBy('last_active_at', 'desc');

		return new Subscribable(query);
	};

	static usersById(idsList)
	{
		let query = dbAccessorApp.users().where(dbAccessorApp.getFirebase().firestore.FieldPath.documentId(), 'in', idsList);

		return new Subscribable(query);
	}
}

export {UsersListAPI};