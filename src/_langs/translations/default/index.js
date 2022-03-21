import app from './app'
import info from './info'
import meta from './meta'
import pages from './pages'

const main = {
	general: {
		name: "Strangy",
	},
	layout: {
		nav: {
			links: {
				home: {
					text: "",
					title: "Strangy"
				},
				about: {
					text: "about project",
					title: "What's Strangy and why it's the past of online chatting.",
				},
				involve: {
					text: "join team",
					title: "Become a contributor to the best online chat platform in a making."
				},
				login: {
					text: "login",
					title: "Create new or login into existing account"
				}
			}
		},
		footer: {
			info: {
				heading: 'Info',
				links: {
					about: 'About project',
					involve: 'Join team',
					status: 'Project status',
					contact: 'Contacts',
					powered_by: "Built using"
				}
			},
			social: {
				heading: 'Social',
				links: {
					twitter: 'Twitter',
					github: 'GitHub',
					reddit: 'Reddit',
					medium: "Blog",
					patreon: "Patreon"
				}
			},
			languages: {
				heading: "Languages"
			},
		}
	},
	cmp: {
		form: {
			rules: {
				min_length: 'must be at least _XNUM_ characters',
				max_length: 'must be no more than _XNUM_ characters',
			}
		}
	},
};

export default Object.assign({}, main, app, meta, pages, info);
