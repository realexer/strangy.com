import firebase from 'firebase/app'
import {UsersCollection, FeedbackCollection, getUserFeedbackCollection, Firestore} from './index'
import {FeedbackModel} from "./models/FeedbackModel";
import {MultiSubscribable, Subscribable} from "./common/Subscribable";

class UsersListAPI
{
  static byId(userId)
  {
    let query = UsersCollection.doc(userId);

    return new Subscribable(query);
  };

  static create(accountId)
  {
    return UsersCollection.doc(accountId).set({
      info: {
        langs: [],
        tags: [],
        filters: [],
        about: "",
      },
      settings: {
        is_open_for_chat: true,
        notifications: {
          email: false,
          push: false
        }
      },
      karma: 0,
      is_active: true,
      last_active_at: new Date(),
      created_at: new Date()
    });
  };

  static activeUsers()
  {
    let query = UsersCollection.where('is_active', '==', true);
    query.orderBy('last_active_at', 'desc');

    return new Subscribable(query);
  };

  static usersById(idsList)
  {
    let query = UsersCollection.where(firebase.firestore.FieldPath.documentId(), 'in', idsList);

    return new Subscribable(query);
  }
}

class UserOperationsAPI
{
  constructor(userId) {
    this.userId = userId;
  }

  static instance(userId) {
    return new UserOperationsAPI(userId);
  }

  setLangs(langs)
  {
    if(Array.isArray(langs) === false) {
      throw 'Langs should be an array.';
    }

    return UsersCollection.doc(this.userId).update({
      "info.langs": langs
    });
  }

  setTags(tags)
  {
    if (tags.length > 5) {
      throw 'Too many tags. Maximum 5 allowed.';
    }

    return UsersCollection.doc(this.userId).update({
      "info.tags": tags
    });
  };

  setKarma(karma)
  {
    return UsersCollection.doc(this.userId).update({
      karma: karma
    });
  };
}

class UserFeedbackAPI
{
  constructor(userId) {
    this.userId = userId;
  }

  static instance(userId) {
    return new UserFeedbackAPI(userId);
  }

  history(fromDate)
  {
    let receivedQuery = FeedbackCollection.where('to_user_id', '==', this.userId);
    //receivedQuery.where('set_at', '>', fromDate);

    let leftQuery = FeedbackCollection.where('from_user_id', '==', this.userId);

    return new MultiSubscribable([receivedQuery, leftQuery]);
  };
}

class UserFeedbackVoteAPI
{
  static get(toUserId, fromUserId)
  {
    return new Subscribable(
      FeedbackCollection.doc(`${toUserId}${fromUserId}`));
  };

  static set(toUserId, fromUserId, vote, message)
  {
    const feedbackRef = FeedbackCollection.doc(`${toUserId}${fromUserId}`);

    return Firestore.runTransaction((transaction) =>
    {
      const userRef = UsersCollection.doc(toUserId);

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
            karma: firebase.firestore.FieldValue.increment(karmaIncrement)
          });

          const feedback = {
            to_user_id: toUserId,
            from_user_id: fromUserId,
            vote: vote,
            message: message,
            set_at: new Date()
          };

          transaction.set(feedbackRef, feedback);
          //return getUserFeedbackCollection(toUserId).doc(fromUserId).set(feedback);
        });
      });
    });
  };
}

export {UsersListAPI, UserOperationsAPI, UserFeedbackAPI, UserFeedbackVoteAPI}