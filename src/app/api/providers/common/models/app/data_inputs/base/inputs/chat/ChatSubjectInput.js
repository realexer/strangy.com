import {DataInput} from "../../DataInput";
import {StringMaxLength, StringMinLength} from "../../validators/String";

export class ChatSubjectInput extends DataInput
{
	constructor(value)
	{
		super(value,
			new StringMinLength(1),
			new StringMaxLength(25));
	}

	filterValue(value)
	{
		value = super.filterValue(value);

		value = value.trim();

		return value;
	}
}