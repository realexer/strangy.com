import {ApiResult} from "../../../common/ApiResult";
import {ChatState, ChatStatus} from "../../common/chats";
import {dbAccessorAdmin} from "../../../../firebase/admin";
import {ChatModel} from "../../common/models/firebase/ChatModel";
import {ChatsListAPI} from "../../app/chat/ChatsListAPI";
import {ChatMessageModel} from "../../common/models/firebase/ChatMessageModel";

class ChatOperationsAPI
{
	constructor(chatId, userId)
	{
		this.chatId = chatId;
		this.byUserId = userId;

	};

	async performOperations(func)
	{
		return await ApiResult.fromPromise(async () =>
		{
			/**
			 * @type {ChatModel}
			 */
			const chat = (await ChatsListAPI.chat(this.chatId).get()).data();

			if(chat.users.hasParticipant(this.byUserId))
			{
				return await func(chat);

			} else {
				throw 'No access.'
			}
		});
	}

	static instance(chatId, userId)
	{
		return new ChatOperationsAPI(chatId, userId);
	}

	async accept()
	{
		return await this.performOperations(async () => {
			return await dbAccessorAdmin.chats().doc(this.chatId).update({
				state: ChatState.ACCEPTED
			});
		});
	};

	async decline()
	{
		return await this.performOperations(async () => {
			return await dbAccessorAdmin.chats().doc(this.chatId).update({
				state: ChatState.DECLINED
			})
		});
	};

	async cancel()
	{
		return await this.performOperations(async () => {
			return await dbAccessorAdmin.chats().doc(this.chatId).update({
				state: ChatState.CANCELED
			});
		});
	};

	async finish()
	{
		return await this.performOperations(async () =>
		{
			return await dbAccessorAdmin.chats().doc(this.chatId).update({
				status: ChatStatus.FINISHED,
				finished_at: new Date(),
				finished_by: this.byUserId
			});
		});
	};

	async sendMessage(text)
	{
		const messageData = {
			from_user_id: this.byUserId,
			text: text,
			read_by: [],
			sent_at: new Date()
		};

		return await this.performOperations(async (chat) =>
		{
			const strangerIds = chat.users.allStrangers(this.byUserId);

			return dbAccessorAdmin.getFirestore().runTransaction(async (transaction) =>
			{
				const chatRef = dbAccessorAdmin.chats().doc(this.chatId);
				const messagesRef = dbAccessorAdmin.chatMessages(this.chatId).doc();

				const updatingData = {
					last_message_at: new Date(),
					messages_amount: dbAccessorAdmin.getFirebase().firestore.FieldValue.increment(1)
				};

				strangerIds.forEach((userId) => {
					updatingData[`new_messages_amount_for_user.${userId}`] = dbAccessorAdmin.getFirebase().firestore.FieldValue.increment(1);
				});

				transaction.set(messagesRef, new ChatMessageModel(messageData));

				transaction.update(chatRef, {
					updatingData
				});
			});
		});
	}

	async setLastReadMessageByUser(messageId)
	{
		return await this.performOperations(async () =>
		{
			return await dbAccessorAdmin.chats().doc(this.chatId).update({

				[`last_read_message_at_by_user.${this.byUserId}`]: messageId,
				[`new_messages_amount_for_user.${this.byUserId}`]: 0
			});
		});
	};

	async addNewMessagesAmountForUsers(userIdsList, amount)
	{
		return await this.performOperations(async () =>
		{
			const updatingData = {};

			userIdsList.forEach((userId) => {
				updatingData[`new_messages_amount_for_user.${userId}`] = dbAccessorAdmin.getFirebase().firestore.FieldValue.increment(amount);
			});

			return await dbAccessorAdmin.chats().doc(this.chatId).update(updatingData);
		});
	};

	async setCustomName(name)
	{
		throw 'Not supported yet';
	}
}

export {ChatOperationsAPI};