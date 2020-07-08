import ApiRequest from "../../../ApiRequest";

class UserTagsApiClient
{
	/**
	 *
	 * @param tag
	 * @param lang
	 * @param kind
	 * @returns {Promise<ApiResult>}
	 */
	static async create(tag, lang, kind)
	{
		return await ApiRequest.post(`user/info/tags/add`, {
			tag: tag,
			lang: lang,
			kind: kind
		});
	}

	/**
	 *
	 * @param tags
	 * @returns {Promise<ApiResult>}
	 */
	static async save(tags)
	{
		return await ApiRequest.post(`user/info/tags/set`, {
			tags
		});
	}
}

export default UserTagsApiClient;