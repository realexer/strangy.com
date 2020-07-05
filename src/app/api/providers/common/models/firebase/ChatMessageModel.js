import {FirebaseConverter, FirebaseModel} from "./base/FirebaseModel";

class ChatMessageModel extends FirebaseModel
{
	constructor(data = {}, id = null) {
		super(data, id);
	}

	static getConverter() {
		return new FirebaseConverter((data, id) => new ChatMessageModel(data, id))
	}

	get sent_at() {
		return this._data.sent_at;
	}

	get text() {
		return this._data.text;
	}

	get from_user_id() {
		return this._data.from_user_id;
	}
}

export {ChatMessageModel};