import {SitemapPage, SitemapPageMetadata, SitemapPageAlternative, ChangeFreq, generateSitemap} from '../lib/sitemap_builder/index';
import env from '../env';
import Multilang from "sickspack/multilang";

const availableLangs = Multilang.getSupportedLanguages();

export function get(req, res)
{
	const urls = [
		new SitemapPageMetadata(`${env.baseUrl}/_lang_/`, 1.0, ChangeFreq.always),
		new SitemapPageMetadata(`${env.baseUrl}/_lang_/about`, 0.9, ChangeFreq.always),
		new SitemapPageMetadata(`${env.baseUrl}/_lang_/involve`, 0.9, ChangeFreq.always),
	];

	const pages = [];

	urls.forEach((metaData) =>
	{
		const alternatives = [];
		Object.keys(availableLangs).forEach((lang) =>
		{
			alternatives.push(new SitemapPageAlternative(lang, metaData.localizeLocation(lang)))
		});

		metaData.location = metaData.localizeLocation('en');
		pages.push(new SitemapPage(metaData, alternatives));
	});

	res.setHeader("Content-Type", "application/rss+xml");

	res.end(generateSitemap(pages));
}