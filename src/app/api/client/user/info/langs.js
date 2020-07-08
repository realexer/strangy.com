import ApiRequest from "../../../ApiRequest";

class UserLangsApiClient
{
	/**
	 *
	 * @param langs
	 * @returns {Promise<ApiResult>}
	 */
	static async save(langs)
	{
		return await ApiRequest.post(`user/info/langs/set`, {
			langs
		});
	}
}

export default UserLangsApiClient;