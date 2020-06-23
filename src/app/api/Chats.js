import firebase from 'firebase/app'
import {ChatsCollection, getMessagesCollection} from './index';
import {UsersListAPI} from "./Users";
import {Subscribable} from "./common/Subscribable";

const ChatState = {
  INVITATION: 'INVITATION',
  ACCEPTED: 'ACCEPTED',
  DECLINED: 'DECLINED',
  CANCELED: 'CANCELED',
};

const ChatStatus = {
  ACTIVE: 'ACTIVE',
  FINISHED: 'FINISHED'
};

class ChatsListAPI
{
  static userChats(userId)
  {
    let query = ChatsCollection.where('participants', 'array-contains', userId);

    query.orderBy('last_message_at', "desc");

    return new Subscribable(query);
  };

  static chat(chatId)
  {
    let query = ChatsCollection.doc(chatId);

    return {
      get: () => {
        return query.get()
      },
      listen: (func) => {
        return query.onSnapshot(func);
      }
    };
  };

  static invite(fromUserId, toUserId, subject)
  {
    const chat = {
      subject: subject,
      subject_by_user: {
        [fromUserId]: '',
        [toUserId]: ''
      },
      owner_id: fromUserId,
      participants: [
        fromUserId,
        toUserId
      ],
      new_messages_amount_for_user: {
        [fromUserId]: 0,
        [toUserId]: 0
      },
      last_read_message_at_by_user: {
        [fromUserId]: new Date(),
        [toUserId]: new Date()
      },
      last_message_at: new Date(),
      state: ChatState.INVITATION,
      status: ChatStatus.ACTIVE,
      created_at: new Date(),
      finished_at: null,
      finished_by: null
    };

    return ChatsCollection.add(chat);
  };
}

class ChatOperationsAPI
{
  /**
   *
   * @param ChatModel chat
   */
  constructor(chat)
  {
    this.chat = chat;
    this.chatId = chat.id;
  };

  static instance(chat) {
    return new ChatOperationsAPI(chat);
  }

  accept()
  {
    return ChatsCollection.doc(this.chatId).update({
      state: ChatState.ACCEPTED
    });
  };

  decline()
  {
    return ChatsCollection.doc(this.chatId).update({
      state: ChatState.DECLINED
    })
  };

  cancel()
  {
    return ChatsCollection.doc(this.chatId).update({
      state: ChatState.CANCELED
    })
  };

  finish(byUserId)
  {
    return ChatsCollection.doc(this.chatId).update({
      status: ChatStatus.FINISHED,
      finished_at: new Date(),
      finished_by: byUserId
    })
  };

  updateLastMessageAt()
  {
    return ChatsCollection.doc(this.chatId).update({
      last_message_at: new Date()
    })
  };

  setLastReadMessageAtByUser(userId, messageId)
  {
    return ChatsCollection.doc(this.chatId).update({
      [`last_read_message_at_by_user.${userId}`]: messageId
    });
  };

  addNewMessagesAmountForUsers(userIdsList, amount)
  {
    const updatingData = {};

    userIdsList.forEach((userId) =>
    {
      updatingData[`new_messages_amount_for_user.${userId}`] = firebase.firestore.FieldValue.increment(amount);
    });

    return ChatsCollection.doc(this.chatId).update(updatingData);
  };

  resetNewMessagesAmountForUser(userId)
  {
    return ChatsCollection.doc(this.chatId).update({
      [`new_messages_amount_for_user.${userId}`]: 0
    });
  };
}

class ChatMessagesAPI
{
  /**
   *
   * @param {ChatModel} chat
   */
  constructor(chat)
  {
    this.chat = chat;
    this.chatId = chat.id;
  }

  static instance(chat) {
    return new ChatMessagesAPI(chat);
  }

  messages()
  {
    let query = getMessagesCollection(this.chatId);

    query = query.orderBy('sent_at', 'desc');

    let subscribable = new Subscribable(query);

    subscribable.onSubscribe = (lastMessageAt) => {
      query.where('sent_at', '>', lastMessageAt);
    };

    return subscribable;
  };

  subscribe(lastMessageAt, func)
  {
    let query = getMessagesCollection(this.chatId);

    query = query.where('sent_at', '>', lastMessageAt);

    query.onSnapshot(func);
  };

  history()
  {
    let query = getMessagesCollection(this.chatId);

    query = query.orderBy('sent_at', 'desc');

    return query;
  };

  async sendMessage(fromUserId, text)
  {
    const message = {
      from_user_id: fromUserId,
      text: text,
      read_by: [],
      sent_at: new Date()
    };

    try {
      await getMessagesCollection(this.chatId).add(message);
      await ChatOperationsAPI.instance(this.chat).updateLastMessageAt();

      const strangerIds = this.chat.users.allStrangers(fromUserId);
      await ChatOperationsAPI.instance(this.chat).addNewMessagesAmountForUsers(strangerIds, 1);
    } catch(e) {
      console.log(e);
    }
  };
}

export {ChatsListAPI, ChatOperationsAPI, ChatMessagesAPI, ChatState, ChatStatus};