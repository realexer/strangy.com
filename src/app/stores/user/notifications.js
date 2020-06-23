import { writable } from 'svelte/store'

class NotificationsCounter {
  constructor(amount) {
    this.amount = amount;
  }
}

const new_messages = writable({});
const new_invitations = writable({});

new_messages.set(new NotificationsCounter(0));
new_invitations.set(new NotificationsCounter(0));

export { new_messages, new_invitations, NotificationsCounter };