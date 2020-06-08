
const webpack = require('webpack');

module.exports = {
    //基本路径
    baseUrl: './', //加 ./ 解决404问题
    // outputDir: 'dist',
    // // 放置静态资源的地方 (js/css/img/font/...)
    // assetsDir: 'static',
    // //以多页模式构建应用程序。
    // pages: undefined,
    // //是否使用包含运行时编译器的 Vue 构建版本
    // runtimeCompiler: false,
    // parallel: require('os').cpus().length > 1,
    // productionSourceMap: false,
    devServer: {
        disableHostCheck: true,
        port: 8080,
        //publicPath: '../',  //这里解决静态资源引用路径问题
        proxy: { 
            '/device': {
                target: "http://djpark.dreamdeck.cn",
                ws: true,
                pathRewrite: {
                    '^/device': '/device'
                }
            },
            '/data': {
                target: "http://djpark.dreamdeck.cn",
                ws: true,
                pathRewrite: {
                    '^/data': '/data'
                }
            },
            '/admin': {
                target: "http://djpark.dreamdeck.cn",
                ws: true,
                pathRewrite: {
                    '^/admin': '/admin'
                }
            },
        }
    },
    configureWebpack: { //引入jquery
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery"
            })
        ]
    },
}
