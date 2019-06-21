<script>
  export let data;
  export let xScale;
  export let yScale;

  let { id, x, y } = data;
  console.log(id);
</script>

<g style="transform: translate({xScale(x)}px, {yScale(y)}px)">
  <circle
    onClick={this.onClick}
    onMouseOver={this.onOver}
    onFocus={this.onOver}
    onMouseOut={this.onOut}
    onBlur={this.onOut}
    r="8"
    stroke={this.selected ? '#ef0000' : '#fff'}
    fill={this.selected ? '#ef9f9f' : '#999'} />
  <text y="4" className={this.selected ? 'selected' : ''}> {id} </text>
</g>
