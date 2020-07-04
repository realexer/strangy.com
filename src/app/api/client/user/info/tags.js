import ApiRequest from "../../../ApiRequest";

class UserTagsApiClient
{
	static async create(tag, lang, kind)
	{
		return await ApiRequest.post(`user/info/tags/add`, {
			tag: tag,
			lang: lang,
			kind: kind
		});
	}

	static async save(tags)
	{
		return await ApiRequest.post(`user/info/tags/set`, {
			tags
		});
	}
}

export default UserTagsApiClient;