import {ChatModel} from "../../api/providers/common/models/firebase/ChatModel";
import {FeedbackModel} from "../../api/providers/common/models/firebase/FeedbackModel";
import {UserModel} from "../../api/providers/common/models/firebase/UserModel";
import {TagModel} from "../../api/providers/common/models/firebase/TagModel";
import {ChatMessageModel} from "../../api/providers/common/models/firebase/ChatMessageModel";

class DBAccessor
{
	/**
	 *
	 * @param {firebase} firebase
	 * @param {firebase.firestore.Firestore} firestore
	 */
	constructor(firebase, firestore)
	{
		this.firebase = firebase;
		this.Firestore = firestore;
	}

	/**
	 *
	 * @returns {firebase}
	 */
	getFirebase() {
		return this.firebase;
	}

	/**
	 *
	 * @returns {firebase.firestore.Firestore}
	 */
	getFirestore() {
		return this.Firestore;
	}

	users() {
		return this.Firestore.collection('user').withConverter(UserModel.getConverter());
	}

	chats() {
		return this.Firestore.collection('chats').withConverter(ChatModel.getConverter());
	}

	tags() {
		return this.Firestore.collection('tags').withConverter(TagModel.getConverter());
	}

	feedback() {
		return this.Firestore.collection('feedback').withConverter(FeedbackModel.getConverter())
	}

	chatMessages(chatId)
	{
		return this.Firestore.collection(`chats/${chatId}/messages`).withConverter(ChatMessageModel.getConverter());
	}
}

export {DBAccessor};