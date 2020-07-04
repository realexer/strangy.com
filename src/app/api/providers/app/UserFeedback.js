import {MultiSubscribable, Subscribable} from "../../common/Subscribable";
import {dbAccessorApp} from "../../../firebase/app";

class UserFeedbackAPI
{
	constructor(userId)
	{
		this.userId = userId;
	}

	static instance(userId)
	{
		return new UserFeedbackAPI(userId);
	}

	history(fromDate)
	{
		let receivedQuery = dbAccessorApp.feedback().where('to_user_id', '==', this.userId);
		//receivedQuery.where('set_at', '>', fromDate);

		let leftQuery = dbAccessorApp.feedback().where('from_user_id', '==', this.userId);

		return new MultiSubscribable([receivedQuery, leftQuery]);
	};

	getVoteByUser(fromUserId)
	{
		return new Subscribable(dbAccessorApp.feedback().doc(`${this.userId}${fromUserId}`));
	};
}

export {UserFeedbackAPI};