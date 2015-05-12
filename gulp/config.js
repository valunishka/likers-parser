var dest = "./dist";
var src = './src';

module.exports = {
  server: {
    settings: {
      root: dest,
      host: 'localhost',
      port: 3000,
      livereload: {
        port: 35929
      }
    }
  },
  sass: {
    src: src + "/styles/**/*.{sass,scss,css}",
    dest: dest + "/styles",
    settings: {
      indentedSyntax: false, // Enable .sass syntax?
      imagePath: '/images' // Used by the image-url helper
    }
  },
  browserify: {
    settings: {
      transform: ['babelify', 'reactify']
    },
    src: src + '/js/index.jsx',
    dest: dest + '/js',
    outputName: 'index.js',
  },
  html: {
    src: 'src/index.html',
    dest: dest
  },
  images: {
    src: 'src/img/**/*',
    dest: dest + '/img'
  },
  watch: {
    src: 'src/**/*.*',
    tasks: ['build']
  }
};
