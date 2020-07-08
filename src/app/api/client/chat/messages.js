import ApiRequest from "../../ApiRequest";

class ChatMessagesApiClient
{
	constructor(chatId)
	{
		this.chatId = chatId;
	}

	/**
	 *
	 * @param message
	 * @returns {Promise<ApiResult>}
	 */
	async send(message)
	{
		return await ApiRequest.post(`chat/${this.chatId}/messages/send`, {
			message: message
		});
	}

	/**
	 *
	 * @param last_received_message_id
	 * @returns {Promise<ApiResult>}
	 */
	async processNew(last_received_message_id)
	{
		return await ApiRequest.post(`chat/${this.chatId}/messages/processNewMessages`, {
			last_received_message_id
		});
	}
}

export default ChatMessagesApiClient;