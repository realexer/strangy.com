import ChatOperationsApiClient from "./operations";
import ChatMessagesApiClient from "./messages";

class ChatApiClient
{
	constructor(chatId)
	{
		this.chatId = chatId;
	}

	/**
	 *
	 * @returns {ChatOperationsApiClient}
	 */
	get operations()
	{
		return new ChatOperationsApiClient(this.chatId);
	}

	/**
	 *
	 * @returns {ChatMessagesApiClient}
	 */
	get messages()
	{
		return new ChatMessagesApiClient(this.chatId);
	}
}

export default ChatApiClient;