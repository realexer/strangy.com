export default {
	general: {
		name: "Strangy",
	},
	meta: {
		index: {
			title: "Strangy - Chat with anyone from all over the globe",
			description: "The best application for casual online conversations in a making."
		},
		info: {
			about: {
				title: "About",
				description: "What's so special about Strangy? Why Strangy is the past of online chatting."
			},
			involve: {
				title: "Get involved",
				description: "Become a contributor to the best online chat platform. Contribute to the idea that will change the way people communicate online."
			},
			disclaimer: {
				title: "Disclaimer",
				description: "Before you dive in and start using Strangy - learn what's Strangy is about and where it's heading."
			}
		},
		login: {
			title: "Login",
			description: "Create new Strangy account or log in into existing."
		},
		tag: {
			info: {
				default: {
					title: "Chat with _tag_",
					description: "Chat with any _tag_ from all over the world. Open communication created for humans."
				},
			},
			interest: {
				default: {
					title: "Chat about _tag_",
					description: "Chat about _tag_ with anyone from all over the world. Open communication created for humans."
				},
			},
			location: {
				default: {
					title: "Chat with anyone from _tag_",
					description: "Chat with people from _tag_ or any other location from all over the world. Open communication created for humans."
				},
			},
			other: {
				default: {
					title: "_tag_ - free open chat",
					description: "Chat with someone representing _tag_ or with anyone about _tag_. Open communication created for humans."
				},
			},
		},
		user: {
			title: "Invite strangy to chat",
			description: "Invite a mysterious person to chat and talk with them about anything that matters to you."
		},
		chat: {
			active: {
				title: "_subject_",
				description: "",
			},
			history: {
				title: "_subject_ - messages history",
				description: "",
			},
		},
		my: {
			settings: {
				title: "Settings",
				description: ""
			},
			feedback: {
				title: "Feedback",
				description: ""
			},
			logout: {
				title: "Good bye...",
				description: ""
			},
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
					disclaimer: 'Disclaimer',
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
	info: {
		general_description: {
			heading: "The past of online chatting",
			details: "Strangy is the state of the art project created and designed to represent everything that online chatting and internet communication should be. "
		},
		tag_page_description: {
			info: {
				heading: "Chat with anyone around the world according your preferences",
				description: "Choose any strangy with tag *_tag_* and start chatting with them.",
				other_popular_tags: "Other popular strangies:",
			},
			interest: {
				heading: "Chat with anyone around the world matching your interests",
				description: "Choose any strangy with tag *_tag_* and start chatting with them.",
				other_popular_tags: "Other popular interests:",
			},
			location: {
				heading: "Chat with anyone from the country or city you want",
				description: "Choose any strangy with tag *_tag_* and start chatting with them.",
				other_popular_tags: "Other popular locations:"
			},
			other: {
				heading: "Chat with anyone from all over the world",
				description: "Choose any strangy with tag *_tag_* and start chatting with them.",
				other_popular_tags: "Other popular tags:",
			}
		}
	},
	app: {
		index: {
			tags_list: {
				heading: "Select who would you like to chat with"
			},
			users_list: {
				heading: "_amount_ ready to chat",
				options: {
					first: "option placeholder 1",
					second: "option placeholder 1"
				},
				user_item: {
					chat: "Chat"
				}
			}
		},
		tag: {
			kinds: {
				info: "Info",
				interest: "Interest",
				location: "Location",
				other: "Other",
			}
		},
		user_links: {
			settings: "settings",
			logout: "logout"
		},
		user: {
			was_online: "was online"
		},
		stranger: {
			invite_form: {
				success_message: 'Invitation sent',
				subject: "subject",
				submit: "invite"
			},
			details: {
				feedback: {
					heading: "Feedback",
					placeholder: "no feedback yet"
				},
				chats: {
					heading: "Chats",
					placeholder: "no chats yet",
					item: {
						msgs: "msg/s"
					}
				}
			}
		},
		chat: {
			status: {
				ACTIVE: "active",
				FINISHED: "finished",
			},
			state: {
				INVITATION: 'invitation',
				ACCEPTED: 'accepted',
				DECLINED: 'declined',
				CANCELED: 'canceled',
			},
			active: {
				feedback: {
					form: {
						input: 'Share a few words about your strangy'
					},
					success_message: 'Feedback submitted'
				},
				actions: {
					rename: "Rename",
					finish: "Finish conversation"
				},
				status: {
					received_invitation: {
						accept: "Accept invitation",
						reject: "reject"
					},
					sent_invitation: {
						heading: "invitation is pending response",
						cancel: "cancel invitation"
					},
					finished: {
						heading: "Chat is finished"
					}
				},
				messaging: {
					form: {
						input: "Message",
						send: "Send"
					},
					placeholder: "no messages yet"
				}
			}
		},
		user_chats: {
			invitations: {
				heading: "_amount_ invitations",
				item: {
					from: "from"
				}
			},
			active: {
				heading: "_amount_ active chats",
				placeholder: "no active chats",
				item: {
					not_accepted_yet: "not accepted yet",
					with: "with",
					new_messages: "_amount_ new messages"
				}
			}
		},
		user_settings: {
			langs: {
				heading: "Your languages"
			},
			tags: {
				selector: {
					heading: "Describe yourself with tags",
					description: "use tags below to describe yourself"
				},
				new_tag_form: {
					heading: "Add new tag",
					controls: {
						tag: "New tag",
						kind: "Type",
						lang: "Language",
						submit: "Create"
					}
				}
			}
		},
		user_my: {
			tags: {},
			profile: {
				heading: "Profile",
				placeholder: "under construction..."
			},
			account: {
				heading: "Account",
				placeholder: "under construction..."
			},
			feedback: {
				heading: "Feedback",
				placeholder: "under construction..."
			}
		},
	},
	cmp: {
		form: {
			rules: {
				min_length: 'must be at least _num_ characters',
				max_length: 'must be no more than _num_ characters',
			}
		}
	},
	pages: {
		info: {
			about: {
				info: {
					heading: "Resurrection of online chats",
					points: {
						global: "Casual conversations with anyone from around the world.",
						privacy: "No need to worry about privacy. Everything is open. Just talk about what matters to you. *We are all humans.*",
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
			disclaimer: {
				heading: "Before you dive in",
				description: "Privacy, Safety, State, Future"
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
			},
			settings: {
				tabs: {
					tags: {
						title: "Tags"
					},
					profile: {
						title: "Profile"
					},
					account: {
						title: "Account"
					}
				}
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