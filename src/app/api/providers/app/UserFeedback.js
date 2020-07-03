import {FeedbackCollection} from "../../../firebase/app/collections";
import {MultiSubscribable, Subscribable} from "../../common/Subscribable";

class UserFeedbackAPI
{
	constructor(userId) {
		this.userId = userId;
	}

	static instance(userId) {
		return new UserFeedbackAPI(userId);
	}

	history(fromDate) {
		let receivedQuery = FeedbackCollection.where('to_user_id', '==', this.userId);
		//receivedQuery.where('set_at', '>', fromDate);

		let leftQuery = FeedbackCollection.where('from_user_id', '==', this.userId);

		return new MultiSubscribable([receivedQuery, leftQuery]);
	};

	getVoteByUser(fromUserId)
	{
		return new Subscribable(FeedbackCollection.doc(`${this.userId}${fromUserId}`));
	};
}

export {UserFeedbackAPI};