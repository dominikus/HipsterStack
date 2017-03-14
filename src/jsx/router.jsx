import {Router} from 'director'
import {autorun} from 'mobx'

import {state} from 'lima/core'

const routes = {
	':id': (id) => {
  	state.selectedItemId = id
  },
  '/': () => {
  	state.selectedItemId = null
  },
}

const config = {
	notfound: () => '',
  html5history: false
}

const router = new Router(routes).configure(config)

export function startRouter() {
  router.init()
}

autorun(()=>{
	window.location.hash = state.path
})
