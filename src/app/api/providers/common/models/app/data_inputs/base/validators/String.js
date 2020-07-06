import {DataValidator} from "../DataInput";

export class StringMinLength extends DataValidator
{
	constructor(length) {
		super();

		this.length = length;
	}

	validate(value)
	{
		if(value.length < this.length) {
			throw `Should be at least ${this.length} characters long.`
		}
	}
}

export class StringMaxLength extends DataValidator
{
	constructor(length) {
		super();

		this.length = length;
	}

	validate(value)
	{
		if(value.length > this.length) {
			throw `Should be less than ${this.length} characters long.`;
		}
	}
}