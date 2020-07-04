import UserTagsApiClient from "./tags";
import UserLangsApiClient from "./langs";

class UserInfoApiClient
{
	static get tags()
	{
		return UserTagsApiClient;
	}

	static get langs()
	{
		return UserLangsApiClient;
	}
}

export default UserInfoApiClient;