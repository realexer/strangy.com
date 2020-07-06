import {DataInput} from "../../DataInput";
import {StringMaxLength} from "../../validators/String";

export class FeedbackMessageInput extends DataInput
{
	constructor(value)
	{
		super(value,
			new StringMaxLength(88));
	}

	filterValue(value)
	{
		value = super.filterValue(value);

		value = value.trim();

		return value;
	}
}