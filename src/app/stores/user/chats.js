import { writable } from 'svelte/store'

const user_chats = writable({});
const user_chats_stranger = writable({});

export { user_chats, user_chats_stranger };