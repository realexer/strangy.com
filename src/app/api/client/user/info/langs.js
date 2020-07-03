import ApiRequest from "../../../ApiRequest";

export const save = async (user_id, langs) =>
{
	return await ApiRequest.post(`user/info/langs/set`, {
		user_id,
		langs
	});
};