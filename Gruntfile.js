'use strict';

const pkg = require('./package.json');

module.exports = (grunt) => {
    grunt.initConfig({
        zip: {
            files: {
                cwd: 'src/',
                dest: `dist/${pkg.name}.zip`,
                src: ['src/**/*.*', '!src/.eslintrc'],
            },
        },
    });

    grunt.loadNpmTasks('grunt-zip');

    grunt.registerTask('default', ['zip']);
};