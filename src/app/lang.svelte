<script>
import {_lang} from './lang.js'
import env from '../env'

export let key;
</script>

{#if env.dev.lang_builder}
	<span data-lang-key="{key}">
		{#if _lang(key)}
			{_lang(key)}
		{:else}
			<slot></slot>
		{/if}
	</span>
{:else}
	{_lang(key)}
{/if}