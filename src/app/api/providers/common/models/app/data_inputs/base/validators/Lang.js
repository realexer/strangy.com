import {DataValidator} from "../DataInput";
import Multilang from "sickspack/multilang";

export class SupportedLang extends DataValidator
{
	constructor() {
		super();
	}

	validate(value)
	{
		if(Multilang.isTranslationAvailable(value) === false) {
			throw `Lang [${value}] is not supported.`;
		}
	}
}