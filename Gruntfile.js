module.exports = function ( grunt ) {

    'use strict';

    var connect = require( 'connect' );
    var modRewrite = require( 'connect-modrewrite' );
    var serveStatic = require( 'serve-static' );

    require( 'time-grunt' )( grunt );

    require( 'jit-grunt' )( grunt, {
        useminPrepare: "grunt-usemin"
    } );

    grunt.initConfig( {

        pkg : grunt.file.readJSON( 'package.json' ),
        week: {
            home : 'week 2',
            index: "dishdetail.html"

        },

        useminPrepare: {
            html   : "app/<%= week.home %>/<%= week.index %>",
            options: {
                dest: "dist/<%= week.home %>/"
            }
        },

        concat: {
            options: {
                separator: ";"
            },
            dist   : {}
        },

        uglify: {
            dist: {}
        },

        cssmin: {
            dist: {}
        },

        filerev: {
            options: {
                encoding : "utf8",
                algorithm: "md5",
                length   : 10
            },
            realise: {
                files: [ {
                    src: [ "dist/<%= week.home %>/*.js", "dist/<%= week.home %>/*.css" ]
                } ]
            }

        },

        usemin: {
            html   : [ 'dist/<%= week.home %>/*.html' ],
            css    : [ 'dist/<%= week.home %>/*.css' ],
            options: {
                assetsDirs: [ 'dist', 'dist/<%= week.home %>/' ]
            }
        },

        jshint: {
            options: {
                jshintrc: ".jshintrc",
                reporter: require( 'jshint-stylish' )
            }, all : {
                src: [
                    'Gruntfile.js',
                    '/app/<%= week.home %>/**.js'

                ]
            }
        },

        copy: {
            dist: {
                cwd   : "app/<%= week.home %>",
                dest  : "dist/<%= week.home %>/",
                src   : [ "!*.js", '**/*.html' ],
                expand: true

            }
        },

        clean: {
            build: {
                src: "dist/"
            }
        },

        watch: {

            copy   : {
                files: [ "!*.js", '**/*.html' ],
                tasks: [ 'build' ]
            },
            scripts: {
                files: [ 'app/**/*.js' ],
                tasks: [ 'build' ]
            },

            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                //middleware: function ( connect ) {
                //
                //    var middlewares = [];
                //
                //    // Serve static files
                //    middlewares.push(
                //        serveStatic( './assets' ),
                //        connect().use(
                //            '/components',
                //            serveStatic( './components' )
                //        )
                //    );
                //
                //    return middlewares;
                //},
                files  : [
                    'app/{,*/}*.html',
                    'app/{,*/}*.js',
                    '.tmp/styles/{,*/}*.css'
                ]
            }

        },

        connect: {
            options: {
                port      : 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname  : 'localhost',
                livereload: 35729

            },
            dist   : {
                options: {
                    open      : true,
                    directory : "<%= week.home %>",
                    index     : "<%= week.index %>",
                    middleware: function ( connect, options ) {

                        var middlewares = [];

                        // Serve static files

                        middlewares.push(
                            modRewrite( [ '^[^\\.]*$ /' + options.index + ' [L]' ] ),
                            serveStatic( './assets/' ),
                            connect().use(
                                '/components',
                                serveStatic( './components' )
                            ),
                            serveStatic( 'dist/' + options.directory + "/" )
                        );

                        return middlewares;
                    }
                }
            }
        }
    } );

    //grunt.load

    grunt.registerTask( 'build', [
        'clean', 'jshint',
        'useminPrepare', 'concat', 'cssmin', 'uglify',
        'copy',
        'filerev',
        'usemin'
    ] );

    grunt.registerTask( "server", [ 'build', "connect:dist", "watch" ] );

    grunt.registerTask( 'default', [ 'build' ] );
};
