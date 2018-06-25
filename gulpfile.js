const gulp = require('gulp');
const broweserSync = require('browser-sync').create();
const sass = require('gulp-sass');
//Compile Sass & Inject Into Browser
gulp.task('sass',function(){
	return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','src/scss*.scss'])
	.pipe(sass())
	.pipe(gulp.dest("src/css"))
	.pipe(broweserSync.stream());
});

//Move JS Files to src/js
gulp.task('js', function(){
	return gulp.src(['node_modules/bootstrap/dis/js/bootstrap.min.js','node_modules/jquery/dist/jquery.min.js','node_modules/popper.js/dist/umd/popper.min.js'])
	.pipe(gulp.dest("src/js"))
	.pipe(broweserSync.stream());
});

//Watch Sass and Server

gulp.task('serve', ['sass'], function(){
	broweserSync.init({
		server: "./src"
	});
	gulp.watch(['node_modulesboottrap/scss/bootstrap.scss', 'src/scss*.scss'], ['sass']);
	gulp.watch("src/*html").on('change', broweserSync.reload);
});

//Move Fonts Folder to src
gulp.task('fonts', function(){
	return gulp.src('node_modules/font-awesome/fonts/*')
	.pipe(gulp.dest("src/fonts"));
});

//Move Fonts Awesome CSS to src
gulp.task('fa', function(){
	return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
	.pipe(gulp.dest("src/css"));
});

gulp.task('default', ['js', 'serve', 'fa', 'fonts']);