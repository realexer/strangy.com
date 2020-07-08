export default {
	general: {
		name: "Strangy",
	},
	meta: {
		index: {
			title: "Strangy.com - chat with anyone from all over the globe",
			description: "The best application for casual online conversations in a making."
		},
		about: {
			title: "What's so special about Strangy?",
			description: "Why Strangy is the past of online chatting."
		},
		involve: {
			title: "Become a contributor to the best online chat platform",
			description: "Contribute to a new chatting platform that will change the way people communicate online."
		}
	},
	layout: {
		main: {
			disclaimer: "The development is currently on going, but you already have a chance to taste the concept and general ideas by breaking the stuff."
		},
		nav: {
			links: {
				home: {
					text: "",
					title: "Strangy"
				},
				about: {
					text: "about",
					title: "What's Strangy and why it's the past of online chatting.",
				},
				involve: {
					text: "get involved",
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
					about: 'About',
					involve: 'Get involved',
				}
			},
			social: {
				heading: 'Social',
				links: {
					twitter: 'Twitter',
					github: 'GitHub',
					reddit: 'Reddit'
				}
			},
			languages: {
				heading: "Languages"
			}
		}
	},
	app: {
		stranger: {
			inviteForm: {
				successMessage: 'Invitation sent'
			}
		},
		chat: {
			active: {
				feedback: {
					successMessage: 'Feedback submitted'
				}
			}
		}
	},
	cmp: {
		form: {
			rules: {
				min_length: 'must be at least _num_ characters'
			}
		}
	},
	pages: {
		index: {
			heading: "The past of online chatting.",
			coming_soon: "coming soon..."
		},
		about: {
			info: {
				heading: "Resurrection of online chats",
				points: {
					global: "Casual conversations with anyone from around the world.",
					privacy: "No need to worry about privacy. Everything is open. Just talk about what matters to you. We are all humans.",
					simplicity: "No visual distractions and features overdose. Focus on the person you chat with.",
					quality: "Chat only with people you find interesting according your purpose."
				}
			},
			meta: {
				heading: "Simple yet modern",
				points: {
					open_source: "100% open source community driven project",
					tech_stack: "Meaningful technological stack: Firebase, Svelte (Sapper), Flutter",
					transparency: "No hidden agendas or misleading ideas"
				}
			}
		},
		involve: {
			heading: "Become a part of the history",
			methods: {
				twitter: "You can become SMM and help us spread the idea of open and free online communication",
				github: "You can help Strangy with technical input, programming or UI/UX ideas and solutions"
			}
		},
		login: {
			heading: "Log-in or Create new account",
			form: {
				email: "Email",
				password: "Password",
				submit: "Enter"
			},
			greeting: "Hello Strangy"
		},
		my: {
			logout: {
				heading: 'Good bye...'
			}
		},
		tag: {
			heading: {
				kind: {
					interest: "Chat with people who are interested in *_tag_*",
					info: "Chat with people who identified themselves as *_tag_*",
					location: "Chat with people from *_tag_*",
					other: "Chat with people with tag *_tag_*",
				},
				currently_online: "Currently online: *_online_*"
			}
		}
	}
};