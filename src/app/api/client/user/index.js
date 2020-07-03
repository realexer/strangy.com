import ApiRequest from "../../ApiRequest";
import info from "./info";

export const create = async (accountId) =>
{
	return await ApiRequest.post(`user/create`, {
		account_id: accountId
	})
};

const user = {
	create: create,
	info: info
};

export default user;