import {Subscribable} from "../../../common/Subscribable";
import {dbAccessorApp} from "../../../../firebase/app";
import {ChatModel} from "../../common/models/firebase/ChatModel";

class ChatsListAPI
{
	static userChats(userId)
	{
		let query = dbAccessorApp.chats().where('participants', 'array-contains', userId);

		query = query.orderBy('last_message_at', "desc");

		return new Subscribable(query);
	};

	static chat(chatId)
	{
		let query = dbAccessorApp.chats().doc(chatId);

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