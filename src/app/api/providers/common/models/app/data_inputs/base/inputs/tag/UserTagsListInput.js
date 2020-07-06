import {DataInputList} from "../../DataInput";
import {ArrayMaxLength} from "../../validators/Array";
import {TagObjectInput} from "./TagObjectInput";

export class UserTagsListInput extends DataInputList
{
	constructor(value)
	{
		super(value, new ArrayMaxLength(5));
	}

	createDataInput(value) {
		return new TagObjectInput(value);
	}
}