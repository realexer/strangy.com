export const redirector = (req, res, next) =>
{
	const rules = [
		[/^\/([\w]+)\/about\/$/, '/$1/info/about'],
		[/^\/([\w]+)\/involve\/$/, '/$1/info/involve'],
		[/^\/(en)\/?$/, '/'],
	];

	for(let [condition, redirect] of rules)
	{
		const match = req.path.match(condition);
		if(match) {
			const redirectUrl = req.path.replace(condition, redirect);

			res.redirect(301, redirectUrl);
			return;
		}
	}

	next();
};