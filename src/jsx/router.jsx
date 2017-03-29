import {Router} from 'director';
import {autorun} from 'mobx';

import uiState from 'state/uiState';

let routes = {
	":id": (id) => {
  	uiState.currentView = id
  },
}

const config = {
	notfound: () => '',
  html5history: false
}

const router = new Router(routes).configure(config);

export function startRouter() {
  router.init();
}

autorun(()=>{
	window.location.hash = uiState.path
});
