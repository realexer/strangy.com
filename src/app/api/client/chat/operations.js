import ApiRequest from "../../ApiRequest";

class ChatOperationsApiClient
{
	constructor(chatId)
	{
		this.chatId = chatId;
	}

	async acceptInvitation()
	{
		return await ApiRequest.post(`chat/${this.chat_id}/invitation/accept`);
	}

	async declineInvitation()
	{
		return await ApiRequest.post(`chat/${this.chatId}/invitation/decline`);
	}

	async cancelInvitation()
	{
		return await ApiRequest.post(`chat/${this.chatId}/invitation/cancel`);
	}

	async finishChat()
	{
		return await ApiRequest.post(`chat/${this.chatId}/finish`);
	}

	async renameChat(subject)
	{
		return await ApiRequest.post(`chat/${this.chatId}/rename`, {
			subject: subject
		});
	}
}

export default ChatOperationsApiClient;