import {UsersManger} from "../../../../app/api/providers/admin/UsersManager";

export async function post(req, res)
{
	const result = await UsersManger.create(req.body.account_id);
	res.send(result);
}