class FilterTagsList
{
	constructor(tags = {}) {
		this.tags = tags;
	}

	addTag(tag) {
		if (this.tags[tag.tag] === undefined) {
			this.tags[tag.tag] = Object.assign(tag, {
				active_users_amount: 0
			});
		}

		this.tags[tag.tag].active_users_amount++;
	}

	addMultiple(tags) {
		tags.forEach((tag) => {
			this.addTag(tag);
		});
	}

	get array() {
		return Object.values(this.tags);
	}

	clear() {
		this.tags = {};
	}

}

class FilterTag {
	constructor(tag, usersAmount) {
		this.tag = tag;
		this.users_amount = usersAmount;
	}
}

class FilterData
{
	constructor()
	{
		this.users = [];
		this.tags = new FilterTagsList();
	}

	putData(users)
	{
		users.forEach((user) =>
		{
			this.tags.addMultiple(user.tags.all);
			this.users.push(user);
		});
	}

	filterUsers(byTags)
	{
		return this.users.filter((user) =>
		{
			return byTags.length === 0 || user.tags.hasAny(byTags);
		});
	}

	getTotalUsersAmount()
	{
		return this.users.length;
	}

	getTagsArray() {
		return this.tags.array.sort((a, b) => b.active_users_amount - a.active_users_amount);
	}

	reset() {
		this.users = [];
		this.tags.clear();
	}
}

export {FilterData};
export {FilterTagsList};