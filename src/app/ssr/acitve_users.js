import {UsersListAPI} from "../api/providers/app/Users";

export const preloadActiveUsers = async (tag, kind) =>
{
	const activeUsers = await UsersListAPI.activeUsers().get();

	return activeUsers.docs.map(d => d.data());
};