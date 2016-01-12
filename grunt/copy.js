module.exports = {
  dev: {
    files: [
      {
        cwd: 'src/',
        src: ['img/*'],
        dest: 'dist/',
        expand: true
      },
      {
        cwd: 'src/',
        src: ['*.html'],
        dest: 'dist/',
        expand: true,
        flatten: true
      }
    ]
  },
  data: {
    files: [
      {
        cwd: 'src/',
        src: ['data/**/*'],
        dest: 'dist/',
        expand: true,
      }
    ]
  }
}
