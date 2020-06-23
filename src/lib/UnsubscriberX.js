class UnsubscriberX
{
	constructor() {
		this.subscriptions = [];
	}

	set add(callable) {
		this.addNamed(callable)
	}

	addNamed(callable, name)
	{
		this.subscriptions.push({
			callable,
			name,
			status: 'sub'
		});
	}

	getByName(name)
	{
		return this.subscriptions.filter(item => item.name === name).shift();
	}

	stop(name)
	{
		const item = this.getByName(name);

		if(item) {
			this.stopItem(item);
		}
	}

	stopItem(item)
	{
		if(item.status === 'sub')
		{
			console.log(`Unsubscribing from: ${item.callable}`);

			item.callable();
			item.status = 'done';
		}
	}

	finish() {
		this.subscriptions.forEach((item) => {
			this.stopItem(item);
		});

		this.subscriptions = [];
	}
}

export {UnsubscriberX};