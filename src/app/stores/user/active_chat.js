import { writable } from 'svelte/store'

const active_chat = writable({});
const active_chat_stranger = writable({});
const active_chat_changed = writable(false);

export { active_chat, active_chat_stranger, active_chat_changed };