# DataController.coffee

dataPath = 'data'
window.data = {}

dispatcher.on "app-ready", () ->
	problem = (error) ->
		console.log 'error loading data:'
		console.log error

	q = queue()
	q
		.defer(d3.tsv, dataPath + '/points.csv')
		# .defer(d3.tsv, dataPath + '/geocodes.csv')

	q.awaitAll(
		(error, results) ->
			if error?
				problem(error)

			[
				points
			] = results

			data.points = points

			dispatcher.trigger "data-loaded"
	)



