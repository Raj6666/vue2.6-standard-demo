// vue.config.js
const path = require("path");

const CompressionWebpackPlugin = require("compression-webpack-plugin"); // 开启gzip压缩， 按需引用
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i; // 开启gzip压缩， 按需写入
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin; // 打包分析

const HardSourceWebpackPlugin = require("hard-source-webpack-plugin"); // 引入打包加速插件
const ProgressBarPlugin = require("progress-bar-webpack-plugin"); // 引入打包进度插件
const chalk = require("chalk");

//环境判断
const IS_PROD = ["production"].includes(process.env.NODE_ENV);
// const IS_DEV = ["development"].includes(process.env.NODE_ENV);

const resolve = (dir) => path.join(__dirname, dir);
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/", // 公共路径
  indexPath: "index.html", // 相对于打包路径index.html的路径
  outputDir: process.env.outputDir || "dist", // 'dist', 生产环境构建文件的目录
  assetsDir: "static", // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: true, // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  parallel: require("os").cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  pwa: {}, // 向 PWA 插件传递选项。

  // Vue CLI 内部的 webpack 配置是通过 webpack-chain 维护的。这个库提供了一个 webpack 原始配置的上层抽象，
  // 使其可以定义具名的 loader 规则和具名插件，并有机会在后期进入这些规则并对它们的选项进行修改。
  // 它允许我们更细粒度的控制其内部配置。
  chainWebpack: (config) => {
    if (!IS_PROD) {
      // 开发环境所需配置
      config.resolve.symlinks(true); // 修复热更新失效
    }

    // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    config.plugin("html").tap((args) => {
      // 修复 Lazy loading routes Error
      args[0].chunksSortMode = "none";
      return args;
    });
    config.resolve.alias // 添加别名
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@components", resolve("src/components"))
      .set("@views", resolve("src/views"))
      .set("@store", resolve("src/store"))
      .set("@utils", resolve("src/utils"));
    // 压缩图片
    // 需要 npm i -D image-webpack-loader
    config.module
      .rule("images")
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({
        mozjpeg: { progressive: true, quality: 65 },
        optipng: { enabled: false },
        pngquant: { quality: [0.65, 0.9], speed: 4 },
        gifsicle: { interlaced: false },
        webp: { quality: 75 },
      });
    // 打包分析
    // 打包之后自动生成一个名叫report.html文件(可忽视)
    if (IS_PROD) {
      config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
        {
          analyzerMode: "static",
        },
      ]);
    }
    // 通过 externals 加载外部 CDN 资源
    if (IS_PROD) {
      config.set("externals", {
        vue: "Vue",
        "vue-router": "VueRouter",
        vuex: "Vuex",
        axios: "axios",
      });
    }
  },
  // 该对象将会被 webpack-merge 合并入最终的 webpack 配置。
  // 文档：https://cli.vuejs.org/zh/guide/webpack.html
  configureWebpack: (config) => {
    // 开启 gzip 压缩
    // 需要 npm i -D compression-webpack-plugin
    const plugins = [];
    if (IS_PROD) {
      plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8,
        }),
        new ProgressBarPlugin({
          format:
            " build [:bar] " +
            chalk.blue.bold(":percent") +
            chalk.green.bold(" (:elapsed seconds)") +
            " (:msg)",
          clear: false,
        })
      );
    }

    // 所有环境都用这个配置
    plugins.push(
      // 构建加速
      new HardSourceWebpackPlugin({
        // cacheDirectory是在高速缓存写入。默认情况下，将缓存存储在node_modules下的目录中，因此如
        // 果清除了node_modules，则缓存也是如此
        cacheDirectory: "node_modules/.cache/hard-source/[confighash]",
        // Either an absolute path or relative to webpack's options.context.
        // Sets webpack's recordsPath if not already set.
        recordsPath:
          "node_modules/.cache/hard-source/[confighash]/records.json",
        // configHash在启动webpack实例时转换webpack配置，并用于cacheDirectory为不同的webpack配
        // 置构建不同的缓存
        configHash: function (webpackConfig) {
          // node-object-hash on npm can be used to build this.
          return require("node-object-hash")({ sort: false }).hash(
            webpackConfig
          );
        },
        // 当加载器，插件，其他构建时脚本或其他动态依赖项发生更改时，hard-source需要替换缓存以确保输
        // 出正确。environmentHash被用来确定这一点。如果散列与先前的构建不同，则将使用新的缓存
        environmentHash: {
          root: process.cwd(),
          directories: [],
          files: ["package-lock.json", "yarn.lock"],
        },
      })
    );

    config.plugins = [...config.plugins, ...plugins];
  },
  css: {
    extract: IS_PROD,
    requireModuleExtension: false, // 去掉文件名中的 .module
    loaderOptions: {
      // 给 sass-loader 传递 sass.js 相关选项
      scss: {
        // `prependData` 定义全局对象，可加入变量样式表
        prependData: `@import "~@/assets/styles/variables.scss";@import "~@/assets/styles/common.scss";`,
      },
    },
  },
  // webpack-dev-server 相关配置
  devServer: {
    overlay: {
      // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true,
    },
    host: "localhost",
    port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    open: false, //配置自动启动浏览器
    hotOnly: true, // 热更新
    // proxy: 'http://localhost:8080'   // 配置跨域处理,只有一个代理
    proxy: {
      //配置多个跨域
      "/api": {
        target: "http://localhost:8080",
        pathRewrite: {
          "^/api": "/",
        },
      },
      "/api2": {
        target: "http://172.12.12.12:2018",
        changeOrigin: true,
        //ws: true,//websocket支持
        secure: false,
        pathRewrite: {
          "^/api2": "/",
        },
      },
    },
  },
};
