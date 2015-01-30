# GLOBALS
# called before anything else
window.dispatcher = _.clone(Backbone.Events)


# -------------------

class App extends Backbone.Router
	views: {}
	models: {}

	routes:
		'*path': 'pageChange'

	initialize: ()->
		Backbone.history.start()

	pageChange: (path)->
		console.log "page change", path

# -------------------

app = new App()
dispatcher.trigger "app-ready"
