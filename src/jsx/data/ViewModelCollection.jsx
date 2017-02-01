import {observer} from 'mobx-react'
import {autorun, observe, observable, map, toJS, extendObservable, action} from 'mobx'
import {assign, clone} from 'lodash'

export default class ViewModelCollection {
	@observable viewModels = []
	constructor(models, template){
		this.viewModelMap = new Map()
		this.template = template

		observe(models, (e)=>{
			// housekeeping
			e.added.forEach(item=>{
				// console.log("++", item)
				this.viewModels.push(this.viewModelForObject(item))
			})

			e.removed.forEach(item=>{
				// console.log("--", item)
				this.viewModels.splice(this.viewModels.indexOf(this.viewModelMap.get(item)), 1)
			})

		}, true)
	}

	viewModelForObject(o){
		let m = this.viewModelMap.get(o)
		if(!m){
			// no model yet, create new
			m = this.makeViewModel(o)
			this.viewModelMap.set(o, m)
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

