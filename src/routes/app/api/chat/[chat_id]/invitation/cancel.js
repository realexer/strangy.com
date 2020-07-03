import {ChatOperationsAPI} from "../../../../../../app/api/providers/admin/chat/ChatOperationsAPI";

export async function post(req, res)
{
	const result = await ChatOperationsAPI.instance(req.params.chat_id).cancel();

	res.send(result);
}