module.exports = function(grunt) {

    grunt.initConfig({

        // JS TASKS ================================================================
        // check all js files for errors
        jshint: {
            all: ['public/js/**/*.js']
        },

        // take all the js files and minify them into app.min.js
        uglify: {
            build: {
                files: {
                    'public/dist/scripts.min.js': ['public/js/**/*.js']
                }
            }
        },

        concat: {
            dist: {
                src: ['public/js/**/*.js'],
                dest: 'public/dist/scripts.min.js',
            },
        },

        // CSS TASKS ===============================================================
        // process the less file to style.css
        //less: {
        //    build: {
        //        files: {
        //            'public/dist/css/style.css': 'public/src/css/style.less'
        //        }
        //    }
        //},

        // take the processed style.css file and minify
        cssmin: {
            build: {
                files: {
                    'public/dist/style.min.css': 'public/styles/style.css'
                }
            }
        },

        // COOL TASKS ==============================================================
        // watch css and js files and process the above tasks
        watch: {
            css: {
                files: ['public/styles/**/*.css'],
                tasks: ['cssmin']
            },
            js: {
                files: ['public/js/**/*.js'],
                tasks: ['jshint', 'concat']
            }
        },

        // watch our node server for changes
        nodemon: {
            dev: {
                script: 'server.js'
            }
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
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('default', ['cssmin', 'jshint', 'concat', 'concurrent']);

};