import {SitemapPage, SitemapPageMetadata, SitemapPageAlternative, ChangeFreq, generateSitemap} from 'sickspack/sitemap_builder';
import env from '../env';
import Multilang from "sickspack/multilang";
import {init} from '../app/init'
import {TagsAPI} from "../app/api/providers/app/TagsAPI";

init();

const availableLangs = Multilang.getSupportedLanguages();

export async function get(req, res)
{
	const urls = [
		new SitemapPageMetadata(env.baseUrl,`/_lang_/`, 1.0, ChangeFreq.always),
		new SitemapPageMetadata(env.baseUrl,`/_lang_/info/about`, 0.6, ChangeFreq.weekly),
		new SitemapPageMetadata(env.baseUrl, `/_lang_/info/involve`, 0.6, ChangeFreq.weekly),
		new SitemapPageMetadata(env.baseUrl, `/_lang_/info/status`, 0.6, ChangeFreq.weekly),
		new SitemapPageMetadata(env.baseUrl, `/_lang_/info/contact`, 0.6, ChangeFreq.weekly),
	];

	const pages = [];

	urls.forEach((metaData) =>
	{
		const alternatives = [];
		Object.keys(availableLangs).forEach((lang) =>
		{
			alternatives.push(new SitemapPageAlternative(env.baseUrl, metaData.localizeLocation(lang), lang))
		});

		metaData.location = metaData.localizeLocation(env.default_lang);
		pages.push(new SitemapPage(metaData, alternatives));
	});

	const tagsList = (await TagsAPI.all([], null, 1).get()).docs.map(d => d.data());

	for(let tag of tagsList) {
		const meta = new SitemapPageMetadata(env.baseUrl,`/${tag.lang}/tag/${tag.kind}/${tag.tag}`, 0.9, ChangeFreq.weekly);

		pages.push(new SitemapPage(meta))
	}

	res.setHeader("Content-Type", "application/xml");

	res.end(generateSitemap(pages));
}