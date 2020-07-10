import UserTagsApiClient from "./tags";
import UserLangsApiClient from "./langs";
import ApiRequest from "../../../ApiRequest";

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

	static async setOnline()
	{
		return await ApiRequest.post(`user/info/status/online`, {});
	}

	static async setOffline()
	{
		return await ApiRequest.post(`user/info/status/offline`, {});
	}
}

export default UserInfoApiClient;