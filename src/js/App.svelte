<script>
  import { items, ready } from './data/dataAPI.js';
  import VisComponent from './components/VisComponent.svelte';

  import { hoveredItemId } from './state/uiStore.js';
</script>

<div>
  <h1>Äpp</h1>
  {#if ready}
    <div>
      <VisComponent data={$items} />
      {#if $hoveredItemId}
        <p> {`Hovering over ${$hoveredItemId}`} </p>
      {/if}
    </div>
  {:else}
    <div>Loading...</div>
  {/if}
</div>
