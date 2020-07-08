import UserTagsApiClient from "./tags";
import UserLangsApiClient from "./langs";

class UserInfoApiClient
{
	/**
	 *
	 * @returns {UserTagsApiClient}
	 */
	static get tags()
	{
		return UserTagsApiClient;
	}

	/**
	 *
	 * @returns {UserLangsApiClient}
	 */
	static get langs()
	{
		return UserLangsApiClient;
	}
}

export default UserInfoApiClient;