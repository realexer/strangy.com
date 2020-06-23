<script>
	import { createEventDispatcher } from 'svelte';

  export let cancelText = 'No';
  export let cancelButton = true;
  export let buttonColor = 'teal';
  export let submitText = 'Yes';
  export let isLoading = false;
  export let confirmInfo = {};

  const dispatch = createEventDispatcher();

  const cancelAction = event => {
    event.preventDefault();
    dispatch('cancel')
  };

  const submitAction = event => {
    event.preventDefault();
    dispatch('confirmAction')
  }
</script>


<div class="field form-buttons">
  {#if cancelButton}
    <button type="button" on:click={cancelAction} class="btn cancel">{cancelText}</button>
  {/if}
  {#if isLoading}
    <div class="preloader-wrapper small active">
      <div class="spinner-layer spinner-green-only">
        <div class="circle-clipper left">
          <div class="circle" />
        </div>
        <div class="gap-patch">
          <div class="circle" />
        </div>
        <div class="circle-clipper right">
          <div class="circle" />
        </div>
      </div>
    </div>
  {:else}
    <button type="button" on:click={submitAction} class="btn">{submitText}</button>
  {/if}
</div>
