import { derived } from 'svelte/store';
import { find } from 'lodash';

import { dataSet } from './dataLoader';

export const items = derived(dataSet, $dataSet => $dataSet);
export const ready = derived(dataSet, $dataSet => $dataSet.length > 0);
/*export const selectedItem = derived(
  [dataSet, selectedItemId],
  ([$dataSet, $selectedItemId]) =>
    find($dataSet, ({ id }) => id === $selectedItemId),
);
export const hoveredItem = derived(
  [dataSet, hoveredItemId],
  ([$dataSet, $hoveredItemId]) =>
    find($dataSet, ({ id }) => id === $hoveredItemId),
);*/
