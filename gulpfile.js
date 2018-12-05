let gulp = require('gulp');

let sftp = require('gulp-sftp');

//演示环境
gulp.task('demo', function() {
  return gulp.src('dist/**')
    .pipe(sftp({
      host: '192.168.63.62',
      user: 'igcsc',
      pass: 'igcsc',
      timeout: 50000,
      remotePath: "/usr/local/nginx-1.9.7_1/html"
    }));
});


//测试环境
gulp.task('dev', function() {
  return gulp.src('dist/**')
    .pipe(sftp({
      host: '10.200.64.9',
      user: 'root',
      pass: 'Aa123456',
      timeout: 50000,
      remotePath: "/home/tomcat-8081/webapps/ROOT"
    }));
});

//正式环境
gulp.task('prod', function() {
  return gulp.src('dist/**')
    .pipe(sftp({
      host: '192.168.12.177',
      user: 'ig_platform',
      pass: 'ig_platform123',
      timeout: 50000,
      remotePath: "/usr/local/nginx-1.9.7/html"
    }));
});