import {DataValidator} from "../DataInput";

export class NumberMin extends DataValidator
{
	constructor(amount) {
		super();

		this.amount = amount;
	}

	validate(value)
	{
		if(value < this.amount) {
			throw `Should be at least ${this.amount}.`
		}
	}
}

export class NumberMax extends DataValidator
{
	constructor(amount) {
		super();

		this.amount = amount;
	}

	validate(value)
	{
		if(value > this.amount) {
			throw `Should be no more than ${this.length}.`;
		}
	}
}