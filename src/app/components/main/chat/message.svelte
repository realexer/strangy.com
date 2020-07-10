<script>
import {formatDate} from "../../../../lib/Date";
export let viewerId;
export let msg;
</script>

<div class="row">
	<div class="col {(viewerId == msg.from_user_id) ? 'offset-s2 s10' : ''} no-padding">
		<div class="card-panel">
			{msg.text}
		</div>
		<span>{formatDate(msg.sent_at.toDate())}</span>
		<p class="_debug">from: {msg.from_user_id}</p>
	</div>
</div>