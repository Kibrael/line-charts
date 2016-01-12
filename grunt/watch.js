module.exports = {
    sass: {
        files: '<%= src %>/scss/**/*.scss',
        tasks: ['sass:dev']
    },
    scripts: {
        files: 'src/js/**/*.js',
        tasks: ['browserify:dev', 'browserify:specs', 'jasmine:dev']
    },
    html: {
        files: 'src/*.html',
        tasks: ['copy:dev']
    },
    specs: {
      files: 'test/*Spec.js',
      tasks: ['browserify:specs', 'jasmine:dev']
    },
    json: {
      files: 'src/data/**/*.json',
      tasks: ['copy:data']
    },
    livereload: {
        options: {
            livereload: '<%= connect.options.livereload %>'
        },
        files: [
            'dist/css/*.css',
            'dist/*.html',
            'dist/js/*.js'
        ]
    }
}
