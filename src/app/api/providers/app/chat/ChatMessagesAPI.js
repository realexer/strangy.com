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

		let subscribable = new Subscribable(query);

		subscribable.onGet = (query, limit, startAt, orderDirection = 'desc') =>
		{
			if(startAt) {
				query = query.startAfter(startAt);
			}

			query = query.orderBy('sent_at', orderDirection);

			query = query.limit(limit);

			return query;
		};

		subscribable.onSubscribe = (query, lastMessageAt) =>
		{
			query = query.where('sent_at', '>', lastMessageAt);
			return query;
		};

		return subscribable;
	};
}

export {ChatMessagesAPI};