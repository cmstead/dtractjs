var jshint = require('./grunt/jshint.json'),
    jasmineNodejs = require('./grunt/jasmine-nodejs.json'),
    uglify = require('./grunt/uglify.json');

module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: jshint,
        jasmine_nodejs: jasmineNodejs,
        uglify: uglify
    });

    /* Load grunt task adapters */

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jasmine-nodejs');

    /* Register composite grunt tasks */

    grunt.registerTask('test', ['jshint', 'jasmine_nodejs']);
    grunt.registerTask('build', ['test', 'uglify']);

    grunt.registerTask('default', ['build']);
};
