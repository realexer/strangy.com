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
		return this.Firestore.collection('user');
	}

	chats() {
		return this.Firestore.collection('chats')
	}

	tags() {
		return this.Firestore.collection('tags')
	}

	feedback() {
		return this.Firestore.collection('feedback')
	}

	chatMessages(chatId)
	{
		return this.Firestore.collection(`chats/${chatId}/messages`);
	}

	userFeedback(userId)
	{
		return this.Firestore.collection(`user/${userId}/feedback`);
	}
}

export {DBAccessor};