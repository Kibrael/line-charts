module.exports = function(grunt) {
  var path = require('path');
  require('load-grunt-config')(grunt, {
    data: {
      src: 'src',
      dist: 'dist',
      test: 'test'
    }
  });
};
