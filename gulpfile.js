// 引入所需插件
var gulp = require("gulp"),
	sass = require("gulp-sass"),
	cssnano = require("gulp-cssnano"),		// css压缩
	uglify = require("gulp-uglify"),		// js压缩
	concat = require("gulp-concat"),		// 合并
	rename = require("gulp-rename");		// 改名
	
// 编译 sass
gulp.task("sass",function(){
	/*
	 * src 指来源
	 * pipe 指管道（把文件及数据，数据的流动依赖管道）
	 * concat 指合并
	 * uglify 指js压缩
	 * dest 指目标
	 */
	gulp.src(["sass/*.scss"])
		.pipe(sass({style : "nested"}))
		.pipe(gulp.dest("css"))				// 保存未压缩文件到指定目录
		.pipe(rename({"suffix" : ".min"}))	// 给文件添加后缀
		.pipe(cssnano())					// 压缩 css 文件
		.pipe(gulp.dest("css"));			// 保存压缩文件到指定目录
})

// 处理js文件
gulp.task("script",function(){
	gulp.src("js/*.js")
		.pipe(uglify())
		.pipe(rename({"suffix" : ".min"}))
		.pipe(gulp.dest("js"));
})

// 监听任务
gulp.task("watch",function(){
	gulp.watch("sass/*.scss",["sass"]);
})
