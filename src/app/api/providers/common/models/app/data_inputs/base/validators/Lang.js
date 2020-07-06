import {DataValidator} from "../DataInput";
import {isLangSupported} from "../../../../../../../../lang";

export class SupportedLang extends DataValidator
{
	constructor() {
		super();
	}

	validate(value)
	{
		if(isLangSupported(value) === false) {
			throw `Lang [${value}] is not supported.`;
		}
	}
}