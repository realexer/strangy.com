import ApiRequest from "../../ApiRequest";
import StrangerFeedbackApiClient from "./feedback";

class StrangerApiClient
{
	constructor(strangerId)
	{
		this.strangerId = strangerId;
	}

	async invite(subject)
	{
		return await ApiRequest.post(`stranger/${this.strangerId}/invite`, {
			subject: subject
		});
	}

	/**
	 *
	 * @returns {StrangerFeedbackApiClient}
	 */
	get feedback()
	{
		return new StrangerFeedbackApiClient(this.strangerId);
	}
}


export default StrangerApiClient;