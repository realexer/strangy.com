import ChatApiClient from "./chat";
import UserApiClient from "./user";
import StrangerApiClient from "./stranger";

class ApiClient
{
	/**
	 *
	 * @returns {UserApiClient}
	 */
	static get user()
	{
		return UserApiClient;
	}

	/**
	 *
	 * @param strangerId
	 * @returns {StrangerApiClient}
	 */
	static stranger(strangerId)
	{
		return new StrangerApiClient(strangerId);
	}

	/**
	 *
	 * @param chatId
	 * @returns {ChatApiClient}
	 */
	static chat(chatId)
	{
		return new ChatApiClient(chatId);
	}
}

export default ApiClient;