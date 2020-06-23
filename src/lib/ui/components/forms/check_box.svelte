<script>
  export let id = undefined; // required

  export let checked = false;
  export let onchange = null;
</script>

<div class="">
  <label for={id}>
    <input type="checkbox" on:change="{onchange}" {id} bind:checked />
    <span class:white-text="{checked}"><slot></slot></span>

  </label>
</div>
