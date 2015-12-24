module.exports = {
  dev: {
    options: {
      sourceMap: true
    },
    files: {
      '<%= dist %>/css/styles.css': '<%= src %>/scss/styles.scss'
    }
  },
  build: {
    options: {
      outputStyle: 'compressed'
    },
    files: {
      '<%= dist %>/css/styles.css': '<%= src %>/scss/styles.scss'
    }
  }
}
