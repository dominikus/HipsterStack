gulp = require('gulp')
coffee = require('gulp-coffee')
concat = require('gulp-concat')
notify = require('gulp-notify')
sourcemaps = require('gulp-sourcemaps')
bower = require('main-bower-files')
sass = require 'gulp-ruby-sass'
fileinclude = require 'gulp-file-include'
replace = require 'gulp-replace-task'
connect = require 'gulp-connect'
del = require 'del'
uglify = require 'gulp-uglify'
imagemin = require 'gulp-imagemin'

configDev =
	"mode": "dev"	# dev|dist
	"target": "dev"	# dev|dist
	"bowerDir": "bower_components"
	"variables":
		"SITE_NAME": "Site name"
		"GA_ID": "_"
		"GA_URL": "_"
		"FB_APP_ID": "_"

configDist =
	"mode": "dist"	# dev|dist
	"target": "dist"	# dev|dist
	"bowerDir": "bower_components"
	"variables":
		"SITE_NAME": "Site name"
		"GA_ID": "_"
		"GA_URL": "_"
		"FB_APP_ID": "_"


config = configDev

onError = (err) -> notify().write err

gulp.task 'bower', ->
	gulp.src bower()
	.pipe concat "libs.js"
	.pipe gulp.dest config.target + '/js'

gulp.task 'coffee', ->
	gulp.src ['src/coffee/main.coffee', 'src/coffee/**/!(main)*.coffee']
	.pipe concat "main.js"
	.pipe sourcemaps.init()
	.pipe coffee bare:false
	.on "error", notify.onError "Error: <%= error.message %>"
	.pipe sourcemaps.write()
	.pipe gulp.dest config.target + '/js'
	#.pipe notify "coffee's ready!"


gulp.task 'sass', ->
	sassStyle = "nested"
	sassStyle = "compressed" if config.mode == "dist"

	sass 'src/sass',
		style: sassStyle
		loadPath: [
			'./src/sass'
			config.bowerDir + '/bootstrap-sass/assets/stylesheets'
			require('node-bourbon').includePaths[0]
		]
	.on "error", notify.onError "Error: <%= error.message %>"
	.pipe gulp.dest config.target + '/css'


gulp.task 'copy', ->
	gulp.src "src/assets/**/*"
	.pipe gulp.dest config.target + '/assets'

	gulp.src "src/js/**/*"
	.pipe gulp.dest config.target + '/js'

	gulp.src "src/data/**/*"
	.pipe gulp.dest config.target + '/data'

gulp.task 'includereplace', ->
	gulp.src "src/**/!(_)*.html"
	.pipe fileinclude
		prefix: '@@'
		basepath: '@file'
	.pipe replace
		patterns: [ json: config.variables ]
	.pipe gulp.dest config.target + '/'

gulp.task 'uglify', ->
	gulp.src config.target + '/js/main.js'
	.pipe uglify
	.on "error", notify.onError "Error: <%= error.message %>"
	.pipe gulp.dest config.target + '/js'

gulp.task 'imagemin', ->
	gulp.src config.target + '/assets/**/*.{png,jpg,gif}'
	.pipe imagemin
	.on "error", notify.onError "Error: <%= error.message %>"
	.pipe gulp.dest config.target + '/assets'

gulp.task 'clean', (cb) ->
	del [ config.target ], cb

gulp.task 'initial-build', ['clean'], () ->
	gulp.start ['copy', 'includereplace', 'coffee', 'sass', 'bower']

gulp.task 'connect', ['initial-build'], ->
	connect.server
		root: config.target + '/'
		port: 8000
		livereload: true

gulp.task 'watch', ['connect'], ->
	gulp.watch 'bower_components/**', ['bower']
	gulp.watch 'src/coffee/**', ['coffee']
	gulp.watch 'src/sass/**', ['sass']
	gulp.watch 'src/assets/**/*', ['copy']
	gulp.watch 'src/js/**/*', ['copy']
	gulp.watch 'src/data/**/*', ['copy']
	gulp.watch 'src/**/*.html', ['includereplace']

gulp.task 'minify', ['initial-build'], ->
	gulp.start 'uglify'

# main tasks:
gulp.task 'dev', ->
	config = configDev
	gulp.start 'watch'

gulp.task 'dist', ->
	config = configDist
	gulp.start 'minify'


# 		'config:dist'
# 		'clean'
# 		'copy'
# 		'bower_concat'
# 		'coffee'
# 		'compass'
# 		'includereplace'
# 		'uglify'
# 		'cssmin'
# 		'imagemin'
# 		'connect:default:keepalive'


# 		"sftp-deploy":
# 			default:
# 				auth:
# 					host: 'starling.columba.uberspace.de'
# 					port: 22,
# 					authKey: 'key1'

# 				src: 'dist'
# 				dest: '/var/www/virtual/starling/html/wef/transformation-maps/'
# 				exclusions: ['.sass-cache']
# 				progress: true



# 		# dist


# 		cssmin:
# 			combine:
# 				files:
# 					'<%= grunt.config.get("environment") %>/css/styles.css': ['<%= grunt.config.get("environment") %>/css/styles.css']


# 		uglify:
# 			options:
# 				compress:
# 					drop_console: true
# 				mangle: true
# 			default:
# 				files: [
# 					'<%= grunt.config.get("environment") %>/js/libs.js' : '<%= grunt.config.get("environment") %>/js/libs.js'
# 					'<%= grunt.config.get("environment") %>/js/main.js' : '<%= grunt.config.get("environment") %>/js/main.js'
# 				]


# 		imagemin:
# 			default:
# 				files: [
# 					expand: true
# 					cwd: '<%= grunt.config.get("environment") %>/assets/'
# 					src: ['**/*.{png,jpg,gif}']
# 					dest: '<%= grunt.config.get("environment") %>/assets/'
# 				]

# 	)

# 	## setup
# 	require('load-grunt-tasks')(grunt)

# 	## tasks
# 	grunt.registerTask('default', [
# 		'config:dev'
# 		'coffee'
# 		'compass'
# 	])

# 	grunt.registerTask('dev', [
# 		'config:dev'
# 		'clean'
# 		'copy'
# 		'bower_concat'
# 		'coffee'
# 		'compass'
# 		'includereplace'
# 		'connect'
# 		'watch'
# 	])

# 	grunt.registerTask('dist', [
# 		'config:dist'
# 		'clean'
# 		'copy'
# 		'bower_concat'
# 		'coffee'
# 		'compass'
# 		'includereplace'
# 		'uglify'
# 		'cssmin'
# 		'imagemin'
# 		'connect:default:keepalive'
# 	])

# 	grunt.registerTask('ftp', [
# 		'sftp-deploy'
# 	])

