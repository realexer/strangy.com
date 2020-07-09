<script>
import { afterUpdate } from 'svelte'

let select = null;
export let id = 'selectElement';
export let label = 'Select';
export let value = null;
export let error = false;
export let errorMessage = 'Please select an option';
export let helpText = '';
export let options = {};

if(value === null)
{
	value = Object.keys(options).shift();
}


afterUpdate(() => {
	M.FormSelect.init(select, {});
})
</script>

<div class="input-field">
  <select bind:value bind:this="{select}" class:invalid={error}>
    {#each Object.keys(options) as value}
      <option value={value}>{options[value]}</option>
    {/each}
  </select>
  <label for={id}>{label}</label>
  <span class="helper-text" data-error={errorMessage}>{helpText}</span>
</div>
