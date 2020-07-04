import ApiRequest from "../../ApiRequest";

class StrangerFeedbackApiClient
{
	constructor(strangerId)
	{
		this.strangerId = strangerId;
	}

	async set(vote, message)
	{
		return await ApiRequest.post(`stranger/${this.strangerId}/feedback/set`, {
			vote: vote,
			message: message
		});
	}
}

export default StrangerFeedbackApiClient;