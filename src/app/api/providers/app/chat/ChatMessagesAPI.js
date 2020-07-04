import {Subscribable} from "../../../common/Subscribable";
import {dbAccessorApp} from "../../../../firebase/app";

class ChatMessagesAPI {
	/**
	 *
	 * @param {ChatModel} chat
	 */
	constructor(chat) {
		this.chat = chat;
		this.chatId = chat.id;
	}

	static instance(chat) {
		return new ChatMessagesAPI(chat);
	}

	messages() {
		let query = dbAccessorApp.chatMessages(this.chatId);

		query = query.orderBy('sent_at', 'desc');

		let subscribable = new Subscribable(query);

		subscribable.onSubscribe = (lastMessageAt) => {
			query.where('sent_at', '>', lastMessageAt);
		};

		return subscribable;
	};

	subscribe(lastMessageAt, func)
	{
		let query = dbAccessorApp.chatMessages(this.chatId);

		query = query.where('sent_at', '>', lastMessageAt);

		query.onSnapshot(func);
	};

	history() {
		let query = dbAccessorApp.chatMessages(this.chatId);

		query = query.orderBy('sent_at', 'desc');

		return query;
	};
}

export {ChatMessagesAPI};