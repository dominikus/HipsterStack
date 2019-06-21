import { onDestroy } from 'svelte';
import { readable, writable, derived } from 'svelte/store';

export const selectedItemId = (() => {
  const { subscribe, set, update } = writable(null);
  return {
    subscribe,
    set: id => set(String(id)),
    update,
  };
})();
export const hoveredItemId = (() => {
  const { subscribe, set, update } = writable(null);
  return {
    subscribe,
    set: id => set(id ? String(id) : null),
    update,
  };
})();

export const urlFragment = derived(selectedItemId, $selectedItemId =>
  [$selectedItemId ? $selectedItemId : ''].map(encodeURIComponent).join('/'),
);

const stopUpdatingURL = urlFragment.subscribe(urlFrag => {
  window.location.hash = urlFrag;
});

/*
onDestroy(() => {
  stopUpdatingURL();
});
*/

function updateFromHash() {
  try {
    const p = window.location.hash
      .replace('#', '')
      .split('/')
      .map(decodeURIComponent);

    selectedItemId.set(p.shift());
  } catch (e) {
    selectedItemId.set(null);
  }
}

window.addEventListener('hashchange', updateFromHash);
