import { Configuration } from 'webpack';
import path from 'path';
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const eslintPlugin = require('eslint-webpack-plugin')
import AutoImport from 'unplugin-auto-import/webpack';
import Components from 'unplugin-vue-components/webpack';
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const config: Configuration = {
  mode: 'production',
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"],// 扩展省略
    // Add support for TypeScripts fully qualified ESM imports.
    extensionAlias: {
      ".js": [".js", ".ts"],
      ".cjs": [".cjs", ".cts"],
      ".mjs": [".mjs", ".mts"]
    },
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.([cm]?ts|tsx)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      },
      { test: /\.vue$/, use: 'vue-loader' },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new eslintPlugin(),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    AutoImport({
      imports: [
        'vue',
      ],
      dts: 'src/auto-imports.d.ts',
      resolvers: [ElementPlusResolver()]
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          filename: 'libs.[chunkhash:4].js',
          priority: 10,
          chunks: 'initial', // 只打包最初依赖的第三方 设置 chunks 为 'initial' 时，Webpack 只会拆分那些同步导入的代码块。
          minChunks: 1
        },
        commons: {
          name: 'chunk-commons',
          filename:'commons.[chunkhash:4].js',
          test: resolve('src'), // can customize your rules
          minChunks: 3, //  minimum common number
          priority: 5,
          reuseExistingChunk: true
        },
        elementUI: {
          name: 'chunk-elementUI',
          filename:'elementUI.[chunkhash:4].js',
          test: /[\\/]node_modules[\\/]_?element-plus(.*)/,  // 为了适应CNPM
          priority: 20, // 重量需要大于lib和app，否则将被打包到lib或app中
        }
      }
    }
  }
}

function resolve(dir: any) {
  return path.join(__dirname, dir)
}

export default config
