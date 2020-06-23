import {UserModel} from './UserModel'
import {ChatState, ChatStatus} from "../Chats";

class ChatModel
{
  constructor(chatInfo) {
    this.chatInfo = chatInfo;
  }

  set chatInfo(chatInfo) {
    this._chatInfo = Object.freeze(chatInfo);
    this._participants = [];
  }

  get chatInfo() {
    return this._chatInfo;
  }

  static fromDoc(doc) {
    const chatInfo = doc.data();
    chatInfo.id = doc.id;

    return new ChatModel(chatInfo);
  }

  get id() {
    return this.chatInfo.id;
  }

  get subject() {
    return this.chatInfo.subject;
  }

  get state()
  {
    const chat = this;

    return {
      get: () => {
        return chat.chatInfo.state;
      },
      isWaitingResponse: () => {
        return chat.chatInfo.state === ChatState.INVITATION;
      },
      isResponded: () => {
        return !this.state.isWaitingResponse();
      },
      isInvitation: (forUserId) =>
      {
        const isInvitation = chat.chatInfo.state === ChatState.INVITATION;

        return {
          get received() {
            return chat.users.starter !== forUserId;
          },
          get sent () {
            return chat.users.starter === forUserId;
          }
        };
      },
    };
  }

  get status()
  {
    const chat = this;

    return {
      get: () => {
        return chat.chatInfo.status;
      },
      get isActive() {
        return chat.chatInfo.status === ChatStatus.ACTIVE;
      },
      get isClosed() {
        return chat.chatInfo.status === ChatStatus.FINISHED;
      }

    };
  }

  get users()
  {
    const chat = this;
    const participants = this._chatInfo.participants;
    return {
      get all() {
        return participants;
      },
      get starter() {
        return participants[0];
      },
      get invited() {
        return participants[1];
      },
      stranger(toUserId) {
        return this.starter !== toUserId ? this.starter: this.invited;
      },
      allStrangers(toUserId) {
        return participants.filter((userId) => {
          return userId !== toUserId;
        });
      },
    };
  }

  get date()
  {
    const chat = this;
    return {
      get startedAt() {
        return chat._chatInfo.created_at.toDate();
      },
      get finishedAt() {
        return chat._chatInfo.finished_at.toDate();
      },
      get lastMessageAt() {
        return chat._chatInfo.last_message_at.toDate();
      }
    };
  }

  get lastMessageAt()
  {
    return this._chatInfo.last_message_at;
  }

  getLastReadMessageAtForUser(userId)
  {
    return ((this._chatInfo.last_read_message_at_by_user || {})[userId]) || 0;
  }

  getNewMessagesAmountForUser(userId)
  {
    return ((this._chatInfo.new_messages_amount_for_user || {})[userId]) || 0;
  }

  raw() {
    return this.chatInfo;
  }
}

export {ChatModel};