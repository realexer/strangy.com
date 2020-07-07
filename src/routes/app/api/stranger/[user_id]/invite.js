import {ChatsManager} from "../../../../../app/api/providers/admin/chat/ChatsManager";
import {ApiResultWithAuth} from "../../../../../app/api/providers/admin/ApiResultWithAuth";

export async function post(req, res)
{
	const result = await ApiResultWithAuth.fromRequest(req,async (user_id) =>
	{
		return await ChatsManager.invite(req.params.user_id, user_id, req.body.subject);
	});

	res.send(result);
}