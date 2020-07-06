import {DataInput} from "../../DataInput";
import {SupportedTagKind} from "../../validators/TagKind";

export class TagKindInput extends DataInput
{
	constructor(value)
	{
		super(value, new SupportedTagKind());
	}
}