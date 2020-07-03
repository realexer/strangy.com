import env from '../../../../../../env'
import {setUserFeedback} from "../../../../../../app/api/providers/admin/UserFeedback";

export async function post(req, res)
{
	const result = await setUserFeedback(
		req.params.user_id,
		req.body.from_user_id,
		parseInt(req.body.vote),
		req.body.message);


	res.send(result);
}