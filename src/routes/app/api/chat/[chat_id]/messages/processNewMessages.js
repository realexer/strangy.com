import {ChatOperationsAPI} from "../../../../../../app/api/providers/admin/chat/ChatOperationsAPI";
import {ApiResult} from "../../../../../../app/api/common/ApiResult";
import {ApiResultWithAuth} from "../../../../../../app/api/providers/admin/ApiResultWithAuth";

export async function post(req, res)
{
	const result = await ApiResultWithAuth.fromRequest(req,async (user_id) =>
	{
		return ApiResult.fromMultiple(
			await ChatOperationsAPI.instance(req.params.chat_id, user_id).setLastReadMessageAtByUser(req.body.last_received_message_id),
			await ChatOperationsAPI.instance(req.params.chat_id, user_id).resetNewMessagesAmountForUser()
		);
	});

	res.send(result);
}