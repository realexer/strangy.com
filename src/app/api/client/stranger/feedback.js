import ApiRequest from "../../ApiRequest";

class StrangerFeedbackApiClient
{
	constructor(strangerId)
	{
		this.strangerId = strangerId;
	}

	/**
	 *
	 * @param vote
	 * @param message
	 * @returns {Promise<ApiResult>}
	 */
	async set(vote, message)
	{
		return await ApiRequest.post(`stranger/${this.strangerId}/feedback/set`, {
			vote: vote,
			message: message
		});
	}
}

export default StrangerFeedbackApiClient;