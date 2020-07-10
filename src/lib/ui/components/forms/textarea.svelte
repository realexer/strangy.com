<script>
  export let inputName = 'textarea';
  export let id = 'textarea';
  export let label = '';
  export let placeholder = '';
  export let value = '';
  export let icon = null;
  export let error = false;
  export let errorMessage = '';
</script>

<div class="">
  {#if icon}
    <i class="material-icons prefix">{icon}</i>
  {/if}
  <textarea
    bind:value="{value}"
    on:input="{() => (error = false)}"
    name="{inputName}"
    id="{id}"
    placeholder="{placeholder}"
    class="materialize-textarea"
    class:invalid={error}
    on:blur />
  <label for={id}>{label}</label>
  <span class="helper-text" data-error={errorMessage} data-success="right" />
</div>
