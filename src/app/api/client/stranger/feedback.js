import ApiRequest from "../../ApiRequest";

const feedback =
{
	set: async (stranger_id, user_id, vote, message) =>
	{
		return await ApiRequest.post(`stranger/${stranger_id}/feedback/set`, {
			from_user_id: user_id,
			vote: vote,
			message: message
		});
	}
};

export default feedback;