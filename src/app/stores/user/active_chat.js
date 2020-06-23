import { writable } from 'svelte/store'

const active_chat = writable({});
const active_chat_stranger = writable({});

export { active_chat, active_chat_stranger };