import {notification_message} from "../../../stores/notification_message";

class UINotification
{
	static info()
	{
		notification_message.set({ message: message, type: 'green' });
	}

	static success(message)
	{
		notification_message.set({ message: message, type: 'green' });
	}

	static error(message)
	{
		notification_message.set({ message: message, type: 'danger-toast' });
	}
}

export default UINotification;