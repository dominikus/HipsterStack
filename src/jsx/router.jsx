import { Router } from 'director/build/director';
import { autorun } from 'mobx';

import uiState from './state/uiState';

const routes = {
  ':id': (id) => {
    uiState.currentView = id;
  },
};

const config = {
  notfound: () => '',
  html5history: false,
};

const router = new Router(routes).configure(config);

export default function startRouter() {
  router.init();
}

autorun(() => {
  window.location.hash = uiState.path;
});
