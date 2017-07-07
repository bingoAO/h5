# specification

> specification

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

1.生成的dist，静态页面打开提示找不到js文件等，需要根据自己生成的目录，修改config文件夹->index.js
中的assetsPublicPath，然后再观察页面上插入到script中的src。
2.router.go页面不跳转，使用router.push
3.根据边框大小和颜色制作箭头
