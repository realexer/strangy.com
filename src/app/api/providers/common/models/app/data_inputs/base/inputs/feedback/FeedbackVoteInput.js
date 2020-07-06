import {DataInput} from "../../DataInput";
import {NumberMax, NumberMin} from "../../validators/Number";

export class FeedbackVoteInput extends DataInput
{
	constructor(value)
	{
		super(value,
			new NumberMin(0),
			new NumberMax(1));
	}

	filterValue(value)
	{
		value = super.filterValue(value);

		value = parseInt(value);

		return value;
	}
}