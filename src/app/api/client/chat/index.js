import ChatOperationsApiClient from "./operations";
import ChatMessagesApiClient from "./messages";

class ChatApiClient
{
	constructor(chatId)
	{
		this.chatid = chatId;
	}

	/**
	 *
	 * @returns {ChatOperationsApiClient}
	 */
	get operations()
	{
		return new ChatOperationsApiClient(this.chatid);
	}

	/**
	 *
	 * @returns {ChatMessagesApiClient}
	 */
	get messages()
	{
		return new ChatMessagesApiClient(this.chatid);
	}
}

export default ChatApiClient;