import {DataValidator} from "../DataInput";
import {isTagKindSupported} from "../../../../../tags";

export class SupportedTagKind extends DataValidator
{
	constructor() {
		super();
	}

	validate(value)
	{
		if(isTagKindSupported(value) === false) {
			throw `Tag kind [${value}] is not supported.`;
		}
	}
}