class FeedbackModel {
  constructor(feedbackObj = {}) {
    this.feedback = feedbackObj || {};
  }

  set feedback(vote) {
    this._feedback = vote;
  }

  get feedback() {
    return Object.freeze(this._feedback);
  }

  static fromDoc(doc) {
    const vote = doc.data() || {};
    vote.id = doc.id;

    return new FeedbackModel(vote);
  }

  get vote() {
    return this._feedback.vote || 0;
  }

  set vote(value) {
    this._feedback.vote = value;
  }

  get message() {
    return this._feedback.message || "";
  }

  set message(value) {
    this._feedback.message = value;
  }

  get setAt() {
    return this._feedback.set_at.toDate();
  }

  raw() {
    return this.feedback;
  }
}

export {FeedbackModel};