import {ChatsCollection} from "../../../../firebase/app/collections";
import {Subscribable} from "../../../common/Subscribable";

class ChatsListAPI
{
	static userChats(userId)
	{
		let query = ChatsCollection.where('participants', 'array-contains', userId);

		query.orderBy('last_message_at', "desc");

		return new Subscribable(query);
	};

	static chat(chatId)
	{
		let query = ChatsCollection.doc(chatId);

		return {
			get: () => {
				return query.get()
			},
			listen: (func) => {
				return query.onSnapshot(func);
			}
		};
	};

}

export {ChatsListAPI};