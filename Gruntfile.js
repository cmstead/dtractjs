module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ["src/**"],
            options: {}
        },
        jasmine_nodejs: {
            core: {
                // target specific options
                options: {
                    specNameSuffix: "spec.js", // also accepts an array
                    useHelpers: false,
                    stopOnFailure: false,
                    reporters: {
                        console: {
                            colors: true,
                            cleanStack: 1,       // (0|false)|(1|true)|2|3
                            verbosity: 3,        // (0|false)|1|2|(3|true)
                            listStyle: "indent", // "flat"|"indent"
                            activity: false
                        }
                    }
                },
                // spec files
                specs: [
                    "spec/**/*.spec.js"
                ]
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                sourceMap: false
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['./scripts/src/**/*.js']
                }
            }
        },
        devserver: {
            server: {
            }
        }
    });

    /* Load grunt task adapters */

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jasmine-nodejs');

    /* Register composite grunt tasks */

    grunt.registerTask('test', ['jshint', 'jasmine_nodejs']);

    grunt.registerTask('buildjs', ['uglify']);
    grunt.registerTask('build', ['test', 'buildjs']);

    //Special build to handle work in progress experiments.
    //NOT FOR PRODUCTION. BYPASSESS LINTING AND TESTING. BUILDS NO DOCUMENTS
    grunt.registerTask('buildrough', ['buildjs'])

    grunt.registerTask('default', ['build']);
};
