# ph-web-starter-kit

# 引用
- gulp
- jade / pug
- sass
- jQuery
- Bootstrap



#下載

```
git clone https://github.com/PhantasWeng/gulp-jade-sass-jquery-starter.git
```

#環境
- npm install
- bower install

#新增 bower 套件
將路徑寫入 gulpfiles.js

```js
gulp.task('bower', function () {
  // var filterCSS = $.filter('**/*.css');
  var filterJS = $.filter('**/*.js');
  var overrides = {
    jquery: {
      main: [
        './dist/jquery.min.js'
      ]
    }
  }
```
將自動編譯至 public/lib/

#執行

輸入 `gulp`, 會自動執行...

1. jade 檔案監聽 並且從 src 資料夾編譯至 public 資料夾內
2. sass 檔案監聽 並且從 src 資料夾編譯至 public 資料夾內
3. js 檔案監聽 並且從 src 資料夾編譯至 public 資料夾內

