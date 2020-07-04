import {ChatOperationsAPI} from "../../../../../../app/api/providers/admin/chat/ChatOperationsAPI";
import {ApiResultWithAuth} from "../../../../../../app/api/providers/admin/ApiResultWithAuth";
import {ApiResult} from "../../../../../../app/api/common/ApiResult";


export async function post(req, res)
{
	const result = await ApiResultWithAuth.fromRequest(req,async (user_id) =>
	{
		return await ChatOperationsAPI.instance(req.params.chat_id, user_id).decline();
	});

	res.send(result);
}