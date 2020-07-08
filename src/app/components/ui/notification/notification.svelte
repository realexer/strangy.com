<script>
  import { onDestroy } from 'svelte'

  import { notification_message } from '../../../stores/notification_message.js'

  export let visible = false;
  export let notification = {};
  let unsubscribe = false;

  $: if (!unsubscribe) {
    unsubscribe = notification_message.subscribe(currentNotification => {
      if (currentNotification.message && currentNotification.message.length > 0) {
        notification = currentNotification;
        visible = true
      } else {
        visible = false
      }
    })
  }

  $: if (visible) {
    M.toast({
      html: notification.message,
      classes: notification.type || 'primary-toast'
    })
  }

  onDestroy(() => {
    unsubscribe()
  })
</script>
