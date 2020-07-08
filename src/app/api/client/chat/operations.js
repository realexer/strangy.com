import ApiRequest from "../../ApiRequest";

class ChatOperationsApiClient
{
	constructor(chatId)
	{
		this.chatId = chatId;
	}

	/**
	 *
	 * @returns {Promise<ApiResult>}
	 */
	async acceptInvitation()
	{
		return await ApiRequest.post(`chat/${this.chat_id}/invitation/accept`);
	}

	/**
	 *
	 * @returns {Promise<ApiResult>}
	 */
	async declineInvitation()
	{
		return await ApiRequest.post(`chat/${this.chatId}/invitation/decline`);
	}

	/**
	 *
	 * @returns {Promise<ApiResult>}
	 */
	async cancelInvitation()
	{
		return await ApiRequest.post(`chat/${this.chatId}/invitation/cancel`);
	}

	/**
	 *
	 * @returns {Promise<ApiResult>}
	 */
	async finishChat()
	{
		return await ApiRequest.post(`chat/${this.chatId}/finish`);
	}

	/**
	 *
	 * @param subject
	 * @returns {Promise<ApiResult>}
	 */
	async renameChat(subject)
	{
		return await ApiRequest.post(`chat/${this.chatId}/rename`, {
			subject: subject
		});
	}
}

export default ChatOperationsApiClient;