class FirebaseModel
{
	constructor(data = {}, id = null)
	{
		this._id = id;
		this._data = data;
	}

	get id() {
		return this._id;
	}

	get data() {
		return this._data;
	}

	fromData(data, id)
	{
		this._id = id;

		for(let key in data)
		{
			this._data[key] = data[key];
		}

		return this;
	}

	toPlainObject(instance)
	{
		let jsonObj = {};

		Object.getOwnPropertyNames(this._data).forEach((prop) =>
		{
			const val = this._data[prop];

			if (typeof val === 'function') {
				return;
			}

			jsonObj[prop] = val;
		});

		return jsonObj;
	};

	static getConverter()
	{
		throw 'Converter needs to be implemented.';
	}
}

class FirebaseConverter
{
	constructor(modelConstructor)
	{
		this.modelConstructor = modelConstructor;
	}

	/**
	 *
	 * @param {FirebaseModel} instance
	 * @returns {*}
	 */
	toFirestore(instance)
	{
		return instance.toPlainObject();
	};

	/**
	 *
	 * @param snapshot
	 * @param options
	 * @returns {FirebaseModel}
	 */
	fromFirestore(snapshot, options)
	{
		const data = snapshot.data(options);
		return this.modelConstructor(data, snapshot.id);
	}
}

export {FirebaseModel, FirebaseConverter}