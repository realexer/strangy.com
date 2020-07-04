import {TagsManager} from "../../../../../../app/api/providers/admin/TagsManager";
import {ApiResultWithAuth} from "../../../../../../app/api/providers/admin/ApiResultWithAuth";

export async function post(req, res)
{
	const result = await ApiResultWithAuth.fromRequest(req,async (user_id) =>
	{
		return await TagsManager.create(
			req.body.tag,
			req.body.lang,
			req.body.kind,
			user_id);
	});

	res.send(result);
}