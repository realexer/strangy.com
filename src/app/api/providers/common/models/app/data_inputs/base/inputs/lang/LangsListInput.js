import {DataInputList} from "../../DataInput";
import {LangInput} from "./LangInput";

export class LangsListInput extends DataInputList
{
	constructor(value)
	{
		super(value);
	}

	createDataInput(value) {
		return new LangInput(value);
	}
}