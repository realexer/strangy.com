import ApiRequest from "../../../ApiRequest";

export const create = async (user_id, tag, lank, kind) =>
{
	return await ApiRequest.post(`user/info/tags/add`, {
		user_id: user_id,
		tag: tag,
		lang: lank,
		kind: kind
	});
};

export const save = async (user_id, tags) =>
{
	return await ApiRequest.post(`user/info/tags/set`, {
		user_id,
		tags
	});
};