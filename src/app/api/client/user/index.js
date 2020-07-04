import ApiRequest from "../../ApiRequest";
import UserInfoApiClient from "./info";

class UserApiClient
{
	static async create()
	{
		return await ApiRequest.post(`user/create`)
	}

	/**
	 *
	 * @returns {UserInfoApiClient}
	 */
	static get info()
	{
		return UserInfoApiClient;
	}
}

export default UserApiClient;