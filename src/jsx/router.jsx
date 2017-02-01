import {Router} from 'director'
import {autorun} from 'mobx'

import uiState from 'state/uiState'

const routes = {
	':id': (id) => {
  	uiState.selectedItemId = id
  },
  '/': () => {
  	uiState.selectedItemId = null
  },
}

const config = {
	notfound: () => '',
  html5history: true
}

const router = new Router(routes).configure(config)

export function startRouter() {
  router.init()
}

autorun(()=>{
	const path = uiState.path
	if (path !== window.location.pathname) {
		window.history.pushState(null, null, path)
	}
})
