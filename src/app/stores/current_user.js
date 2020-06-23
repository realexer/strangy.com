import { writable } from "svelte/store";

const userInfo = writable({});
const auth_info = writable({});

const setUser = user => {
    userInfo.set(user);
};

const removeUser = () => {
    userInfo.set({});
};

const current_user = {
    subscribe: userInfo.subscribe,
    set: setUser,
    remove: removeUser
};

export { current_user, auth_info };