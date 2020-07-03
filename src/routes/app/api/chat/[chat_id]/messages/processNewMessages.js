import {ChatOperationsAPI} from "../../../../../../app/api/providers/admin/chat/ChatOperationsAPI";
import {ApiResult} from "../../../../../../app/api/common/ApiResult";

export async function post(req, res)
{
	const result = ApiResult.fromMultiple(
		await ChatOperationsAPI.instance(req.params.chat_id).setLastReadMessageAtByUser(req.body.user_id, req.body.last_received_message_id),
		await ChatOperationsAPI.instance(req.params.chat_id).resetNewMessagesAmountForUser(req.body.user_id)
	);

	res.send(result);
}