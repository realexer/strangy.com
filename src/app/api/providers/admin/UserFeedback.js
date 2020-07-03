import {ApiResult} from "../../common/ApiResult";
import {FeedbackCollection, Firestore, UsersCollection} from "../../../firebase/admin/collections";
import {FeedbackModel} from "../common/models/FeedbackModel";
import {firebase_admin} from "../../../firebase/admin";

export const setUserFeedback = async (toUserId, fromUserId, vote, message) => {
	return await ApiResult.fromPromise(async () => {
		const feedbackRef = FeedbackCollection.doc(`${toUserId}${fromUserId}`);

		return Firestore.runTransaction((transaction) => {
			const userRef = UsersCollection.doc(toUserId);

			return transaction.get(userRef).then((res) => {
				return transaction.get(feedbackRef).then((feedbackRes) => {
					const currentFeedback = FeedbackModel.fromDoc(feedbackRes);

					let karmaIncrement = vote;

					if (currentFeedback.vote === vote) {
						karmaIncrement = -vote;
					}

					transaction.update(userRef, {
						karma: firebase_admin.firestore.FieldValue.increment(karmaIncrement)
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