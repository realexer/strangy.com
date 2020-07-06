class FilterTagsList {
	constructor(tags = {}) {
		this.tags = tags;
	}

	addTag(tag) {
		if (this.tags[tag.tag] === undefined) {
			this.tags[tag.tag] = 0;
		}

		this.tags[tag.tag]++;
	}

	addMultiple(tags) {
		tags.forEach((tag) => {
			this.addTag(tag);
		});
	}

	get array() {
		const tagsArray = [];

		for (let tag in this.tags) {
			tagsArray.push(new FilterTag(tag, this.tags[tag]))
		}

		return tagsArray;
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

	putData(docs)
	{
		docs.forEach((doc) =>
		{
			const user = doc.data();
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
		return this.tags.array.sort((a, b) => b.users_amount - a.users_amount);
	}

	reset() {
		this.users = [];
		this.tags.clear();
	}
}

export {FilterData};
export {FilterTagsList};