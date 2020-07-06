import {ApiResult} from "../../common/ApiResult";
import {FeedbackModel} from "../common/models/firebase/FeedbackModel";
import {dbAccessorAdmin} from "../../../firebase/admin";
import {FeedbackVoteObjectInput} from "../common/models/app/data_inputs/base/inputs/feedback/FeedbackVoteObjectInput";
import {UserFeedbackAPI} from "../app/UserFeedback";

export const setUserFeedback = async (fromUserId, toUserId, vote, message) =>
{
	return await ApiResult.fromPromise(async () =>
	{
		const feedbackRef = dbAccessorAdmin.feedback().doc(`${toUserId}${fromUserId}`);

		return dbAccessorAdmin.getFirestore().runTransaction(async (transaction) =>
		{
			const userRef = await dbAccessorAdmin.users().doc(toUserId).get();

			if(!userRef.exists)
				throw 'User not found';

			const currentFeedback =
				(await UserFeedbackAPI.instance(toUserId).getVoteByUser(fromUserId).get()).data()
				|| new FeedbackModel();

				//const currentFeedback = doc.data();

				const feedback = new FeedbackVoteObjectInput({
					to_user_id: toUserId,
					from_user_id: fromUserId,
					vote: vote,
					message: message,
					set_at: new Date()
				}).validated();


				let karmaIncrement = vote;

				if (currentFeedback.vote === vote && vote > 0) {
					karmaIncrement = -1;
				}

				transaction.update(userRef.ref, {
					karma: dbAccessorAdmin.getFirebase().firestore.FieldValue.increment(karmaIncrement)
				});

				transaction.set(feedbackRef, new FeedbackModel(feedback));
		});
	});
};