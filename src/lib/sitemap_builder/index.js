export const ChangeFreq =
{
	always: "always",
	hourly: "hourly",
	daily: "daily",
	weekly: "weekly",
	monthly: "monthly",
	yearly: "yearly",
	never: "never"
};

export class SitemapPageMetadata
{
	constructor(location, priority, changeFreq)
	{
		this.location = location;
		this.priority = priority;
		this.changeFreq = changeFreq;
	}

	localizeLocation(lang) {
		return this.location.replace('_lang_', lang);
	}
}

export class SitemapPage
{
	constructor(metaData, alternatives)
	{
		this.metaData = metaData;
		this.alternatives = alternatives || [];
	}

	toXML()
	{
		const alternatives = this.alternatives.map(a => a.toXML()).join('\n');

		return `
						<url>
							<loc>${this.metaData.location}</loc>
							<priority>${this.metaData.priority.toFixed(1)}</priority>
							<changefreq>${this.metaData.changeFreq}</changefreq>
							${alternatives}
						</url>`;
	}
}

export class SitemapPageAlternative
{
	constructor(lang, url)
	{
		this.lang = lang;
		this.url = url;
	}

	toXML()
	{
		return `
							<xhtml:link rel="alternate" hreflang="${this.lang}" href="${this.url}"/>`;
	}
}

export const generateSitemap = (pagesList) =>
{
	const parts = [
		`<?xml version="1.0" encoding="UTF-8" ?>`
	];

	parts.push(`<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`)

	pagesList.forEach(page => {
		parts.push(page.toXML());
	});

	parts.push(`</urlset>`);

	return parts.join('\n');
};