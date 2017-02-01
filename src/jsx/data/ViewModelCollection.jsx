import {observer} from 'mobx-react'
import {autorun, observable, map, toJS, extendObservable, action} from 'mobx'
import {assign, clone} from 'lodash'

export default class ViewModelCollection {

	constructor(template){
		this.viewModels = new Map()
		this.template = template
	}

	viewModelForObject(o){
		let m = this.viewModels.get(o)
		if(!m){
			// no model yet, create new
			m = this.makeViewModel(o)
			this.viewModels.set(o, m)
		}
		return m
	}

	makeViewModel(o){
		return extendObservable({
			// update function to assign new values
			update: action(function(o){
				assign(this, o)
			}),
			__data: o,
			id: o.id
		}, this.template)
	}
}

