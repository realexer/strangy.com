import {writable} from 'svelte/store';
import _default from "../_langs/_default";
import langs from "../_langs/index";
import {readByPath, writeByPath} from "../lib/object_key_path";

export let session_lang = 'en';
export let current_lang = writable(session_lang);
export let tmpLang = {};

export const _lang = function(path, _default = "")
{
	const value = readByPath(langs[session_lang], path);

	writeByPath(tmpLang, path, value);

	return value || _default;
};

export const isLangSupported = (lang) =>
{
	return langs[lang] !== undefined;
};

export const set_lang = function(lang)
{
	if(isLangSupported(lang) === false) {
		throw `Unknown language [${lang}]`;
	}
	session_lang = lang;
	current_lang.set(session_lang);
};

export const build_lang = function()
{
	const langObject = {};

	const langElements = document.querySelectorAll("[data-lang-key]");

	langElements.forEach((el) => {
		const langKeyPath = el.getAttribute("data-lang-key");
		const value = el.innerText;
		writeByPath(langObject, langKeyPath, value);
	});

	return langObject;
};