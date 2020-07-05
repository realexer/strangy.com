import {ChatState} from "../../chats";
import {ChatStatus} from "../../chats";
import {FirebaseConverter, FirebaseModel} from "./base/FirebaseModel";

class ChatModel extends FirebaseModel
{
  constructor(data = {}, id = null) {
    super(data, id);
  }

  static getConverter() {
    return new FirebaseConverter((data, id) => new ChatModel(data, id))
  }

  get subject() {
    return this.data.subject;
  }

  get state()
  {
    const chat = this;

    return {
      get: () => {
        return chat.data.state;
      },
      isWaitingResponse: () => {
        return chat.data.state === ChatState.INVITATION;
      },
      isResponded: () => {
        return !this.state.isWaitingResponse();
      },
      isInvitation: (forUserId) =>
      {
        const isInvitation = chat.data.state === ChatState.INVITATION;

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
        return chat.data.status;
      },
      get isActive() {
        return chat.data.status === ChatStatus.ACTIVE;
      },
      get isClosed() {
        return chat.data.status === ChatStatus.FINISHED;
      }

    };
  }

  /**
   *
   * @returns {*}
   */
  get users()
  {
    const chat = this;
    const participants = this.data.participants;
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
      hasParticipant(userId) {
        return participants.includes(userId);
      }
    };
  }

  get date()
  {
    const chat = this;
    return {
      get startedAt() {
        return chat.data.created_at.toDate();
      },
      get finishedAt() {
        return chat.data.finished_at.toDate();
      },
      get lastMessageAt() {
        return chat.data.last_message_at.toDate();
      }
    };
  }

  get lastMessageAt()
  {
    return this.data.last_message_at;
  }

  getLastReadMessageAtForUser(userId)
  {
    return ((this.data.last_read_message_at_by_user || {})[userId]) || 0;
  }

  getNewMessagesAmountForUser(userId)
  {
    return ((this.data.new_messages_amount_for_user || {})[userId]) || 0;
  }

}

export {ChatModel};