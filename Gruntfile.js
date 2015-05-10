var clean = require('./grunt/clean.json'),
    concat = require('./grunt/concat.json'),
    jasmineNodejs = require('./grunt/jasmine-nodejs.json'),
    jshint = require('./grunt/jshint.json'),
    uglify = require('./grunt/uglify.json');

module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: clean,
        concat: concat,
        jasmine_nodejs: jasmineNodejs,
        jshint: jshint,
        uglify: uglify
    });

    /* Load grunt task adapters */

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jasmine-nodejs');

    /* Register composite grunt tasks */

    grunt.registerTask('pre-test', ['clean', 'concat']);
    grunt.registerTask('test', ['jshint', 'pre-test', 'jasmine_nodejs']);
    grunt.registerTask('build', ['test', 'uglify']);

    grunt.registerTask('default', ['build']);
};
