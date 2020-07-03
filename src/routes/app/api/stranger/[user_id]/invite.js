import {ChatsManager} from "../../../../../app/api/providers/admin/chat/ChatsManager";

export async function post(req, res)
{
	const result = await ChatsManager.invite(req.body.from_user_id, req.params.user_id, req.body.subject);

	res.send(result);
}