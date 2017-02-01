import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {toJS, observe, autorun} from 'mobx'
import {observer} from 'mobx-react'

import * as PIXI from 'pixi.js'

import {toPairs, find} from 'lodash'

export const BG_COL = 0xFFFFFF

let textStyle = {
	fontFamily: 'Avenir Next',
	fontSize: '24px',
	// 'strokeThickness': 2,
	// 'stroke': BG_COL,
	// 'lineJoin': 'round',
	'align': 'center',
	'lineHeight': 18,
	'wordWrap': true,
	'wordWrapWidth': 80
}

const hex = (hashColor)=> {
	return hashColor.replace('#', '0x')
}

const toPixiColor = ({r,g,b})=> {
	return Math.floor(((r << 16) + (g << 8) + b))
}

export const itemViewModelTemplate = {
	x : 0,
	y : 0,
	scale : 1,
	color: 0x999999,
	label: '',
  selected: false,
}


let index = 0

class ItemMapView extends Component {
	render() {
		const {width, height} = this.props

		return (
			<div>
				<canvas
          key='pixi'
          width={width}
          height={height}
          ref='canvas'
        />
			</div>
		)
	}

	componentDidMount() {

		const {viewModels, scale, translate, zooming, width, height} = this.props

		const p = {
			'antialias': true,
			'transparent': false,
			'backgroundColor': BG_COL,
			'resolution': 2,
			'view': this.refs.canvas,
			'autoResize': true
		}

		this.pixiApp = new PIXI.Application(width, height, p)
    this.stage = this.pixiApp.stage
    this.stage.hitArea = new PIXI.Rectangle(0, 0, width, height)
    this.stage.interactive = true

    this.stage.click = event=>{
      event.stopPropagation()
      this.props.setSelectedItemId(null)
    }

    this.pixiApp.ticker.add((n)=>{
    	// console.log('*')
    })

    this.itemSprites = []

    observe(viewModels, (x)=>{
    	if(x.added.length) console.log('viewmodels added', x.added.length, x.added)
    	if(x.removed.length) console.log('viewmodels removed', x.removed.length, x.removed)

    	x.added.forEach(vm=>{
    		// add item
	    	this.createSprite(vm, this.props.setSelectedItemId)
	    })

	    x.removed.forEach(vm=>{
	    	// remove item
	    	this.removeSprite(vm)
	    })

    }, true)

    this.updateView()
	}

	createSprite(vm, clickAction){
		const ns = new ItemSprite(vm, clickAction)
	  this.itemSprites.push(ns)
		this.stage.addChild(ns)
	}

	removeSprite(vm){
		const ns = find(this.itemSprites, x=>x.viewModel == vm)
  	this.stage.removeChild(ns)
  	this.itemSprites.splice(this.itemSprites.indexOf(ns), 1)
	}

	updateView(){
		// update zoom, pan
		const {scale, translate} = this.props

		if(scale) this.stage.scale.set(scale)
		if(translate) this.stage.position.set(translate[0], translate[1])

		this.itemSprites.forEach((ns)=>{
			ns.updateView(scale, translate)
		})
	}

	componentDidUpdate(prevProps, prevState) {
		this.updateView()
	}
}

class ItemSprite extends PIXI.Container {
	constructor(vm, clickAction) {
		super()
  	this.viewModel = vm
  	this.clickAction = clickAction
		this.setUp()

  	autorun(()=> this.updateAttributes())
  	this.updateAttributes()

  	this.interactive = true
	}

	setUp(){

  	const ds = new PIXI.Graphics()
  	ds.scale.set(.5)
  	ds.beginFill(0x999999)
  	ds.drawCircle(0,0,10)
  	ds.endFill()
  	this.addChild(ds)
  	this.dotSprite = ds
  	ds.interactive = true

		const tsContainer = new PIXI.Sprite()
		const ts = new PIXI.Text('', textStyle)
  	ts.anchor.set(.5)
  	ts.scale.set(1)
  	ts.y = 10
  	// ts.interactive = true
  	this.textSprite = ts
  	this.textSpriteContainer = tsContainer
  	this.addChild(tsContainer)
  	tsContainer.addChild(ts)

    const selectionMarker = new PIXI.Graphics()
    selectionMarker.scale.set(1)
    selectionMarker.beginFill(0xFF9999)
    selectionMarker.drawCircle(0,0,10)
    selectionMarker.blendMode = PIXI.BLEND_MODES.MULTIPLY
    selectionMarker.endFill()
    this.addChild(selectionMarker)
    this.selectionMarker = selectionMarker
    selectionMarker.visible = false
    selectionMarker.interactive = true
	}

	updateAttributes(){
		const {x, y, label, color, scale, selected} = this.viewModel
		this.position.set(x,y)
  	this.textSprite.text = label
  	// if(color) this.dotSprite.tint = toPixiColor(color)

  	// this.dotSprite.scale.set(scale)
  	// this.visible = scale > 0

    this.selectionMarker.visible = selected
    // debugger
    // console.log(x,y, selected)
	}

	updateView(scale, translate){

		this.scale.set(Math.sqrt(1/scale))
		// this.scale.set(Math.sqrt(1/scale))
		// this.textSprite.visible = scale/4 + this.viewModel.scale > 2
	}

	click(event){
    event.stopPropagation()
		console.table(toPairs(toJS(this.viewModel).__data))
		console.table(toPairs(toJS(this.viewModel)))
		// should be props.onItemClick o.ä.
		this.clickAction(this.viewModel.id)
	}
}


export default ItemMapView

