import {TagsManager} from "../../../../../../app/api/providers/admin/TagsManager";

export async function post(req, res)
{
	const result = await TagsManager.create(
		req.body.tag,
		req.body.lang,
		req.body.kind,
		req.body.user_id);

	res.send(result);
}