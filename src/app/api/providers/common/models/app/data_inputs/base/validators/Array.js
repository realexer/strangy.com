import {DataValidator} from "../DataInput";

export class ArrayMinLength extends DataValidator
{
	constructor(length) {
		super();

		this.length = length;
	}

	validate(value)
	{
		if(value.length < this.length) {
			throw `Should be at least ${this.length} items.`
		}
	}
}

export class ArrayMaxLength extends DataValidator
{
	constructor(length) {
		super();

		this.length = length;
	}

	validate(value)
	{
		if(value.length > this.length) {
			throw `Should be no more than ${this.length} items.`;
		}
	}
}