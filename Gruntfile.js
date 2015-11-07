module.exports = function(grunt) {

    grunt.initConfig({

        // JS TASKS ================================================================
        // check all js files for errors
        jshint: {
            all: ['public/js/**/*.js']
        },

        concat: {
            dist: {
                src: [
                    'public/bower_components/underscore/underscore-min.js',
                    'public/bower_components/jquery/dist/jquery.min.js',
                    'public/bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'public/js/**/*.js',
                    '!**/*Spec.js'
                ],
                dest: 'public/dist/scripts.min.js'
            }
        },

        // take the processed style.css file and minify
        cssmin: {
            build: {
                files: {
                    'public/dist/style.min.css': 'public/styles/style.css'
                }
            }
        },

        karma: {
            client: {
                configFile: 'tests/karma.conf.js'
            }
        },

        // watch css and js files and process the above tasks
        watch: {
            css: {
                files: ['public/styles/**/*.css'],
                tasks: ['cssmin'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['public/js/**/*.js', '!**/*Spec.js'],
                tasks: ['jshint', 'concat'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['public/**/*.html'],
                options: {
                    livereload: true
                }
            },
            config: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true
                }
            }
        },

        // watch our node server for changes
        nodemon: {
            dev: {
                script: 'server.js'
            }
        },

        // check your code against coding guidelines
        jscs: {
            client: 'public/src/**',
            server: ['private/**', 'server.js'],
            tests: 'tests/**',
            config: ['config/**', 'Gruntfile.js', 'conf.js']
        },

        // run watch and nodemon at the same time
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            tasks: ['nodemon', 'watch']
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('default', ['cssmin', 'jshint', 'jscs', 'concat', 'concurrent']);
};
