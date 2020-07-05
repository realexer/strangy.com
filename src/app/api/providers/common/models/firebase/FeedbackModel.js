import {FirebaseConverter, FirebaseModel} from "./base/FirebaseModel";

class FeedbackModel extends FirebaseModel
{
  constructor(data = {}, id = null)
  {
    super(data, id);
  }

  static getConverter()
  {
    return new FirebaseConverter((data, id) => new FeedbackModel(data, id));
  }

  get vote() {
    return this.data.vote || 0;
  }

  set vote(value) {
    this.data.vote = value;
  }

  get message() {
    return this.data.message || "";
  }

  set message(value) {
    this.data.message = value;
  }

  get setAt() {
    return this.data.set_at.toDate();
  }
}

export {FeedbackModel};