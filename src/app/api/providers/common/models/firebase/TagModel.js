import {FirebaseConverter, FirebaseModel} from "./base/FirebaseModel";

class TagModel extends FirebaseModel
{
	constructor(data = {}, id = null)
	{
		super(data, id);
	}

	static getConverter()
	{
		return new FirebaseConverter((data, id) => new TagModel(data, id));
	}

	get tag() {
		return this._data.tag;
	}

	get lang() {
		return this._data.lang;
	}

	get kind() {
		return this._data.kind;
	}

	get users_amount() {
		return this._data.users_amount;
	}
}

export {TagModel};