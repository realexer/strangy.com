<script>
  import { afterUpdate } from 'svelte'

	let select = null;
  export let id = 'selectElement';
  export let label = 'Select';
  export let value = '';
  export let error = false;
  export let errorMessage = 'Please select an option';
  export let helpText = '';
  export let options = [];
  export let defaultOption = {};
  export let optionsMap = null;

  if(optionsMap !== null) {
    for(let optKey in optionsMap) {
      options.push({
        id: optKey,
        name: optionsMap[optKey]
      });
    }
  }

  if(value == '') {
		value = options[0].id;
	}

  if (defaultOption.id) {
    options.unshift(defaultOption)
  }

  afterUpdate(() => {
    M.FormSelect.init(select, {});
  })
</script>

<div class="input-field">
  <select bind:value bind:this="{select}" class:invalid={error}>
    {#each options as option (option.id)}
      <option value={option.id}>{option.name}</option>
    {/each}
  </select>
  <label for={id}>{label}</label>
  <span class="helper-text" data-error={errorMessage}>{helpText}</span>
</div>
