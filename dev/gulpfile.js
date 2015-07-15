var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    pngcrush = require('imagemin-pngcrush'),
    minifyCss = require('gulp-minify-css'),
    minifyHTML = require('gulp-minify-html'),
    connect = require('gulp-connect'),
    minify = require('gulp-minify'),
    inject = require('gulp-inject'),
    rename = require('gulp-rename'),
    inject = require('gulp-inject-string'),
    livereload = require('gulp-livereload');



gulp.task('minify-html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };
 
     gulp.src('www/*.html')
    .pipe(minifyHTML(opts))
    .pipe(connect.reload())
    .pipe(gulp.dest('../mobile'));
    
});



gulp.task('inject-favicon', function(){
    gulp.src('www/*.html')
        .pipe(inject.after('</title>', '\n<link rel="shortcut icon" href="img/favicon.ico">\n'))
        .pipe(gulp.dest('www/'));
});
        

//javascript 
gulp.task('scripts', function() {
  gulp.src('www/lib/**/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(connect.reload())
    .pipe(gulp.dest('../mobile/lib/js'));

});


gulp.task('css', function () {
gulp.src('www/lib/**/*.css')
    .pipe(minifyCss())
    .pipe(concat('all.css'))
    .pipe(gulp.dest('../mobile/lib/css'))
    .pipe(livereload());

});




//librerias de web 
gulp.task('js', function() {
  gulp.src('www/js/**/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('../mobile/js'))
    .pipe(livereload());
});

//imagenes 
gulp.task('images', function () {
     gulp.src('www/img/**/*.{png,jpg,jpeg,gif,svg}')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('../mobile/img'));
});


gulp.task('minify-css', function() {
    gulp.src('www/css/**/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('../mobile/css'));
});



gulp.task('default', ['minify-html', 'js', 'scripts', 'minify-css', 'images', 'css', 'watch']);

gulp.task('watch', function() {
    gulp.watch('www/*.html', ['minify-html']);
    gulp.watch('www/js/**/*.js', ['js']);
    gulp.watch('www/css/**/*.css', ['minify-css']);
    gulp.watch('www/img/**/*.{png,jpg,jpeg,gif,svg}', ['images']);
    gulp.watch('www/lib/**/*.js', ['scripts']);
    gulp.watch('www/lib/**/*.css', ['css']);

});