import ApiRequest from "../../ApiRequest";

export const acceptInvitation = async (chat_id) =>
{
	return await ApiRequest.post(`chat/${chat_id}/invitation/accept`);
};

export const declineInvitation = async (chat_id) =>
{
	return await ApiRequest.post(`chat/${chat_id}/invitation/decline`);
};

export const cancelInvitation = async (chat_id) =>
{
	return await ApiRequest.post(`chat/${chat_id}/invitation/cancel`);
};

export const finishChat = async (chat_id, user_id) =>
{
	return await ApiRequest.post(`chat/${chat_id}/finish`, {
		user_id: user_id
	});
};

export const renameChat = () => {

};