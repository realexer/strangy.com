export class DataInput
{
	/**
	 *
	 * @param value
	 * @param {DataValidator[]} validators
	 */
	constructor(value, ...validators)
	{
		this.value = this.filterValue(value);
		this.validators = validators;
	}

	filterValue(value) {
		return value;
	}

	validated()
	{
		for(let validator of this.validators) {
			validator.validate(this.value);
		}

		return this.value;
	}
}

export class DataInputList extends DataInput
{
	/**
	 *
	 * @param {Array} values
	 * @param {DataValidator} validators
	 */
	constructor(values)
	{
		super(values);
	}

	filterValue(value)
	{
		if (Array.isArray(value) === false) {
			throw 'Should be an array.';
		}

		return value.map((v) => this.createDataInput(v));
	}

	validated()
	{
		const values = [];
		for (let key in this.value) {
			values[key] = this.value[key].validated();
		}

		return values;
	}

	createDataInput(value) {
		throw 'Needs to be implemented in descenders';
	}
}

export class DataInputCombined extends DataInput
{
	validated()
	{
		const validatedData = {};

		for(let field in this.value) {
			const value = this.value[field];

			if(value instanceof DataInput)
			{
				try {
					validatedData[field] = value.validated();
				} catch (e) {
					throw `'${field}': ${e.toString()}`;
				}
			}
			else
			{
				// if not a DataInput then put value as it is
				validatedData[field] = value;
			}
		}

		return validatedData;
	}
}

export class DataValidator
{
	validate(value) {
		throw 'Needs to be implemented in descenders.';
	}
}