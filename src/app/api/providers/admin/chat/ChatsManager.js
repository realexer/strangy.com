import {ChatState, ChatStatus} from "../../common/chats";
import {ApiResult} from "../../../common/ApiResult";
import {dbAccessorAdmin} from "../../../../firebase/admin";

class ChatsManager
{
	static async invite(fromUserId, toUserId, subject) {
		const chat = {
			subject: subject,
			subject_by_user: {
				[fromUserId]: '',
				[toUserId]: ''
			},
			owner_id: fromUserId,
			participants: [
				fromUserId,
				toUserId
			],
			new_messages_amount_for_user: {
				[fromUserId]: 0,
				[toUserId]: 0
			},
			last_read_message_at_by_user: {
				[fromUserId]: new Date(),
				[toUserId]: new Date()
			},
			last_message_at: new Date(),
			state: ChatState.INVITATION,
			status: ChatStatus.ACTIVE,
			created_at: new Date(),
			finished_at: null,
			finished_by: null
		};

		return await ApiResult.fromPromise(async () => {
			const chatResult = await dbAccessorAdmin.chats().add(chat);
			return {chat_id: chatResult.id};
		});
	};
}

export {ChatsManager};