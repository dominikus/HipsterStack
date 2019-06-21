import { readable } from 'svelte/store';
import { tsv } from 'd3';

const dataPath = '../../data/data.tsv';

export const dataSet = readable([], async set => {
  const response = await tsv(dataPath);
  set(
    response.map(d =>
      Object.assign(d, {
        id: String(d.id),
        x: Math.random(),
        y: Math.random(),
      }),
    ),
  );
});
