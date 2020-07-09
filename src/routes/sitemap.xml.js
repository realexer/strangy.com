import {SitemapPage, SitemapPageMetadata, SitemapPageAlternative, ChangeFreq, generateSitemap} from 'sickspack/sitemap_builder';
import env from '../env';
import Multilang from "sickspack/multilang";
import {init} from '../app/init'

init();

const availableLangs = Multilang.getSupportedLanguages();

export function get(req, res)
{
	const urls = [
		new SitemapPageMetadata(env.baseUrl,`/_lang_/`, 1.0, ChangeFreq.always),
		new SitemapPageMetadata(env.baseUrl,`/_lang_/info/about`, 0.9, ChangeFreq.always),
		new SitemapPageMetadata(env.baseUrl, `/_lang_/info/involve`, 0.9, ChangeFreq.always),
	];

	const pages = [];

	urls.forEach((metaData) =>
	{
		const alternatives = [];
		Object.keys(availableLangs).forEach((lang) =>
		{
			alternatives.push(new SitemapPageAlternative(env.baseUrl, metaData.localizeLocation(lang), lang))
		});

		metaData.location = metaData.localizeLocation('en');
		pages.push(new SitemapPage(metaData, alternatives));
	});

	res.setHeader("Content-Type", "application/rss+xml");

	res.end(generateSitemap(pages));
}