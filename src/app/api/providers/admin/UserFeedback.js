import {ApiResult} from "../../common/ApiResult";
import {FeedbackModel} from "../common/models/FeedbackModel";
import {dbAccessorAdmin} from "../../../firebase/admin";

export const setUserFeedback = async (fromUserId, toUserId, vote, message) =>
{
	return await ApiResult.fromPromise(async () =>
	{
		const feedbackRef = dbAccessorAdmin.feedback().doc(`${toUserId}${fromUserId}`);

		return dbAccessorAdmin.getFirestore().runTransaction((transaction) => {
			const userRef = dbAccessorAdmin.users().doc(toUserId);

			return transaction.get(userRef).then((res) =>
			{
				return transaction.get(feedbackRef).then((feedbackRes) =>
				{
					const currentFeedback = FeedbackModel.fromDoc(feedbackRes);

					let karmaIncrement = vote;

					if (currentFeedback.vote === vote) {
						karmaIncrement = -vote;
					}

					transaction.update(userRef, {
						karma: dbAccessorAdmin.getFirebase().firestore.FieldValue.increment(karmaIncrement)
					});

					const feedback = {
						to_user_id: toUserId,
						from_user_id: fromUserId,
						vote: vote,
						message: message,
						set_at: new Date()
					};

					transaction.set(feedbackRef, feedback);
				});
			});
		});
	});
};