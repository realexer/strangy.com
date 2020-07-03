import {ApiResult} from "../../../common/ApiResult";
import {ChatsCollection} from "../../../../firebase/admin/collections";
import {ChatState, ChatStatus} from "../../common/chats";
import {firebase_admin} from "../../../../firebase/admin";
import {ChatModel} from "../../common/models/ChatModel";
import {ChatsListAPI} from "../../app/chat/ChatsListAPI";
import {getMessagesCollection} from "../../../../firebase/admin/collections";

class ChatOperationsAPI {
	constructor(chatId) {
		this.chatId = chatId;
	};

	static instance(chatId) {
		return new ChatOperationsAPI(chatId);
	}

	async accept() {
		return await ApiResult.fromPromise(async () => {
			return await ChatsCollection.doc(this.chatId).update({
				state: ChatState.ACCEPTED
			});
		});
	};

	async decline() {
		return await ApiResult.fromPromise(async () => {
			return await ChatsCollection.doc(this.chatId).update({
				state: ChatState.DECLINED
			})
		});
	};

	async cancel() {
		return await ApiResult.fromPromise(async () => {
			return await ChatsCollection.doc(this.chatId).update({
				state: ChatState.CANCELED
			});
		});
	};

	async finish(byUserId) {
		return await ApiResult.fromPromise(async () => {
			return await ChatsCollection.doc(this.chatId).update({
				status: ChatStatus.FINISHED,
				finished_at: new Date(),
				finished_by: byUserId
			});
		});
	};

	async sendMessage(userId, text)
	{
		const message = {
			from_user_id: userId,
			text: text,
			read_by: [],
			sent_at: new Date()
		};

		const chat = ChatModel.fromDoc(await ChatsListAPI.chat(this.chatId).get());

		const strangerIds = chat.users.allStrangers(userId);

		return ApiResult.fromMultiple(
			await ApiResult.fromPromise(async () => (await getMessagesCollection(this.chatId).add(message)).id),
			await ApiResult.fromPromise(async () => await this.updateLastMessageAt()),
			await ApiResult.fromPromise(async () => await this.addNewMessagesAmountForUsers(strangerIds, 1))
		);
	}

	async updateLastMessageAt() {
		return await ApiResult.fromPromise(async () => {
			return await ChatsCollection.doc(this.chatId).update({
				last_message_at: new Date()
			});
		});
	};

	async setLastReadMessageAtByUser(userId, messageId) {
		return await ApiResult.fromPromise(async () => {
			return await ChatsCollection.doc(this.chatId).update({
				[`last_read_message_at_by_user.${userId}`]: messageId
			});
		});
	};

	async addNewMessagesAmountForUsers(userIdsList, amount) {
		return await ApiResult.fromPromise(async () => {
			const updatingData = {};

			userIdsList.forEach((userId) => {
				updatingData[`new_messages_amount_for_user.${userId}`] = firebase_admin.firestore.FieldValue.increment(amount);
			});

			return await ChatsCollection.doc(this.chatId).update(updatingData);
		});
	};

	async resetNewMessagesAmountForUser(userId) {
		return await ApiResult.fromPromise(async () => {
			return await ChatsCollection.doc(this.chatId).update({
				[`new_messages_amount_for_user.${userId}`]: 0
			});
		});

	};
}

export {ChatOperationsAPI};