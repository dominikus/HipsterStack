<script>
  import { beforeUpdate } from 'svelte';
  import { scaleLinear, extent } from 'd3';

  import VisComponentElement from './VisComponentElement.svelte';

  export let data = [];

  let xScale = d => d;
  let yScale = d => d;

  beforeUpdate(() => {
    if (data.length > 0) {
      const newXScale = scaleLinear()
        .domain(extent(data, d => d.x))
        .range([10, 290]);
      const newYScale = scaleLinear()
        .domain(extent(data, d => d.y))
        .range([10, 140]);
      xScale = newXScale;
      yScale = newYScale;
    }
  });

  $: console.log(data);
</script>

<div>
  <p>Vis: {data.length}</p>
  <svg id="viz">
    {#each data as d (d.id)}
      <VisComponentElement data={d} {xScale} {yScale} />
    {/each}
  </svg>
</div>
