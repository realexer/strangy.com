import {UserOperationsAPI} from "../../../../../../app/api/providers/admin/UserOperations";


export async function post(req, res)
{
	const result = await UserOperationsAPI.instance(req.body.user_id).setLangs(req.body.langs);

	res.send(result);
}