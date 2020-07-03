import { Firestore } from './index'

const UsersCollection = Firestore.collection('user');
const ChatsCollection = Firestore.collection('chats');
const TagsCollection = Firestore.collection('tags');
const FeedbackCollection = Firestore.collection('feedback');

const getMessagesCollection = (chatId) =>
{
	return Firestore.collection(`chats/${chatId}/messages`);
};

const getUserFeedbackCollection = (userId) =>
{
	return Firestore.collection(`user/${userId}/feedback`);
};

export {
	UsersCollection,
	Firestore,
	TagsCollection,
	ChatsCollection,
	FeedbackCollection,
	getMessagesCollection,
	getUserFeedbackCollection }