import local from './_config/local/env';

const env =
{
	baseUrl: 'https://strangy.com',
	api_url: '/app/api',
	dev: {
		enabled: false,
		use_emulators: false,
		ui_log: false,
		lang_builder: false
	},
};

export default Object.assign({}, env, local);