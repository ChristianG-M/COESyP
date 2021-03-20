const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
        contentBase: './build',
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 },
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        },
        proxy: {
            "/app-encabezado": {
                target: "http://localhost:8081",
            },
            "/app-2": {
                target: "http://localhost:8082",
                pathRewrite: { "^/app-2": "" }
            },
            "/app-panel-control": {
                target: "http://localhost:8083",
                pathRewrite: { "^/app-panel-control": "" }
            },
            "/app-tearsheet": {
                target: "http://localhost:8084",
                pathRewrite: { "^/app-tearsheet": "" }
            },
            "/app-3": {
                target: "http://localhost:8085",
            },
            "/app-4": {
                target: "http://localhost:8086",
                pathRewrite: { "^/app-4": "" }
            }
        }
    }
});