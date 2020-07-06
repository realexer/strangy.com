import {DataInputCombined} from "../../DataInput";
import {FeedbackVoteInput} from "./FeedbackVoteInput";
import {FeedbackMessageInput} from "./FeedbackMessageInput";

export class FeedbackVoteObjectInput extends DataInputCombined
{
	constructor(value, ...validators)
	{
		super(value, validators);

		value.vote = new FeedbackVoteInput(value.vote);
		value.message = new FeedbackMessageInput(value.message);
	}
}