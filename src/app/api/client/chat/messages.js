import ApiRequest from "../../ApiRequest";

export const send = async (chat_id, user_id, message) =>
{
	const result = await ApiRequest.post(`chat/${chat_id}/messages/send`, {
		user_id: user_id,
		message: message
	});
};

export const processNew = async (chat_id, user_id, last_received_message_id) =>
{
	return await ApiRequest.post(`chat/${chat_id}/messages/processNewMessages`, {
		user_id,
		last_received_message_id
	});
};