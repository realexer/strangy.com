import {DataInputCombined} from "../../DataInput";
import {TagInput} from "./TagInput";
import {LangInput} from "../lang/LangInput";
import {TagKindInput} from "./TagKindInput";

export class TagObjectInput extends DataInputCombined
{
	constructor(value, ...validators)
	{
		super(value, validators);

		value.tag = new TagInput(value.tag);
		value.lang = new LangInput(value.lang);
		value.kind = new TagKindInput(value.kind);
	}
}