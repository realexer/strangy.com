import {Subscribable} from "../../../common/Subscribable";
import {dbAccessorApp} from "../../../../firebase/app";

class ChatMessagesAPI {
	/**
	 *
	 * @param {ChatModel} chatId
	 */
	constructor(chatId) {
		this.chatId = chatId;
	}

	static instance(chatId) {
		return new ChatMessagesAPI(chatId);
	}

	messages()
	{
		let query = dbAccessorApp.chatMessages(this.chatId);

		query = query.orderBy('sent_at', 'desc');

		let subscribable = new Subscribable(query);

		subscribable.onGet = (limit, startAt) =>
		{
			if(startAt) {
				query.startAt(startAt);
			}

			query.limit(limit);
		};

		subscribable.onSubscribe = (lastMessageAt) => {
			query.where('sent_at', '>', lastMessageAt);
		};

		return subscribable;
	};
}

export {ChatMessagesAPI};