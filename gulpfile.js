var gulp = require('gulp');
var postcss = require('gulp-postcss');
var browserSync = require('browser-sync').create();
var atImport = require("postcss-import");
var cssnext = require('postcss-cssnext');
var rucksack = require('rucksack-css');

// Servidor de desarrollo
gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
})

// Tarea para procesar el CSS

gulp.task('css', function () {

  var processors = [
        cssnext(),
        atImport(),
        rucksack(),


  ]

  gulp.src('src/css/index.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream())
})


// Tarea para vigilar los cambios
gulp.task('watch', function () {
  gulp.watch('src/css/*.css', ['css']).on('change', browserSync.reload)
  gulp.watch('*.html').on('change', browserSync.reload)
})

gulp.task('default', ['watch', 'css' , 'serve'])