import {DataInput} from "../../DataInput";
import {SupportedLang} from "../../validators/Lang";

export class LangInput extends DataInput
{
	constructor(value)
	{
		super(value, new SupportedLang());
	}
}