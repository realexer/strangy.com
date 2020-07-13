export default {
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
					heading: "Hearts and reviews",
					placeholder: "no feedback yet"
				},
				chats: {
					heading: "Conversations",
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
				heading: "Hearts and reviews",
				placeholder: "under construction..."
			}
		},
	},
};