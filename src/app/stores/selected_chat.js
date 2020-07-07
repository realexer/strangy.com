import { writable } from 'svelte/store'

const selected_chat = writable({});

export { selected_chat };