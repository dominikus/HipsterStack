import {observer} from 'mobx-react'
import {autorun, observable, map, toJS, extendObservable, action} from 'mobx'
import {assign, clone} from 'lodash'

export const viewModels = new Map()

// get viewModel for object o,
// if needed, creates it based on template
// assumption: one view model per data object
// (otherwise use makeViewModel and manage them yourself)

export function viewModel(o, template={}){
	let m = viewModels.get(o)
	if(!m){
		// no model yet, create new
		m = makeViewModel(template, o)
		viewModels.set(o, m)
	}
	return m
}

// make a new viewModel with observable properties
// and update function
export function makeViewModel(template, o){
	return extendObservable({
		// update function to assign new values
		update: action(function(o){
			assign(this, o)
		}),
		__data: o,
		id: o.id
	}, template)
}
