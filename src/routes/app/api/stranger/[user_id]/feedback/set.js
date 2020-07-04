import env from '../../../../../../env'
import {setUserFeedback} from "../../../../../../app/api/providers/admin/UserFeedback";
import {ApiResultWithAuth} from "../../../../../../app/api/providers/admin/ApiResultWithAuth";
import {ChatsManager} from "../../../../../../app/api/providers/admin/chat/ChatsManager";

export async function post(req, res)
{
	const result = await ApiResultWithAuth.fromRequest(req,async (user_id) =>
	{
		return await setUserFeedback(
			user_id,
			req.params.user_id,
			parseInt(req.body.vote),
			req.body.message);
	});

	res.send(result);
}