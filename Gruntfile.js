module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            html: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['*.html'],
                    dest: './'
                }]
            }
        },
        htmlmin: {                                     // Task
            dist: {                                      // Target
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {                                   // Dictionary of files
                    'index.html': 'src/index.html',     // 'destination': 'source'
                    'portfolio.html': 'src/portfolio.html',
                    'outdatedBrowser.html': 'src/outdatedBrowser.html'
                }
            }
        },
        uglify: {
            js: {
                files: [{
                    expand: true,
                    cwd: 'src/js',
                    src: ['**/*.js','!jsx/*.js'],
                    dest: './js'
                }]
            }
        },
        csscomb: {
            options:{
                config:"zen.json"
            },
            dynamic_mappings: {
                expand: true,
                cwd: 'src/css/',
                src: ['*.css'],
                dest: './css/',
                ext: '.css'
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'css/style.css': ['css/style.css'],
                    'css/tistory.css': ['css/tistory.css'],
                }
            }
        },
		less : {
			dev : {
				files : {
					'./src/css/style.css' : './src/css/less/style.less',
					'./src/css/tistory.css' : './src/css/less/tistory.less'
				}
			}
		},
		watch : {
			less: {
				files : [ "./src/css/less/*.less" ],
				tasks : [ 'less' ]
			},
			jsx:{
				files:["./src/js/jsx/*.js"],
				tasks:["babel"]
			}
		},
		babel : {
			options : {
				plugins : [ 'transform-react-jsx' ],
				presets : [ 'es2015', 'react' ]
			},
			jsx : {
				files : [ {
					expand : true,
					cwd : './src/js/jsx/', // Custom folder
					src : [ '*.js' ],
					dest : './src/js/app/portfolio/', // Custom folder
					ext : '.js'
				} ]
			}
		}
    });

    for (var key in grunt.file.readJSON("package.json").devDependencies) {
        if (key !== "grunt" && key.indexOf("grunt") === 0) grunt.loadNpmTasks(key);
    };

    
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('dist', ['htmlmin:dist','uglify:js','csscomb','cssmin']);

};