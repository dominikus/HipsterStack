import { Router } from 'director/build/director';
import { autorun } from 'mobx';
import uiState from './state/uiState';

const routes = {
  '(.*)': p => uiState.setFromUrlFragment(p),
};

const config = {
  notfound: () => '',
  html5history: false,
  run_handler_in_init: true,
};

const router = new Router(routes).configure(config);

export default function startRouter() {
  router.init();

  autorun(() => {
    window.location.hash = uiState.urlFragment;
  });
}
