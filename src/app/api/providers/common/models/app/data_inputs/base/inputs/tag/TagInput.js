import {DataInput} from "../../DataInput";
import {StringMaxLength, StringMinLength} from "../../validators/String";

export class TagInput extends DataInput
{
	constructor(value)
	{
		super(value,
			new StringMinLength(3),
			new StringMaxLength(25));
	}

	filterValue(value)
	{
		value = super.filterValue(value);

		value = value.trim().toLowerCase();

		value = value.replace(/[^\w0-9]+/g, '-').replace(/^-*|-*$/g, '');

		return value;
	}
}