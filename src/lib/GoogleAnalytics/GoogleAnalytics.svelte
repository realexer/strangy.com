<script>
  import { stores } from '@sapper/app';
  const { page } = stores();

  export let gtag_id = null;

  $: {
    if (typeof gtag !== "undefined"){
      gtag("config", gtag_id, {
        page_path: $page.path
      });
    }
  }
</script>