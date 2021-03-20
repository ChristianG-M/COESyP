const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

    entry: {
        principal: './src/principal.js'
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            hash: false,
            inject: false
        }),
        new MiniCSSExtractPlugin(),
        new CopyWebpackPlugin([
            { from: path.resolve(__dirname, 'node_modules/systemjs/dist/system.js') }
        ]),
        new CleanWebpackPlugin(['build'])
    ],

    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: [path.resolve(__dirname, 'node_modules')],
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                loader: [
                    MiniCSSExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader'
            }
        ],
    },
    node: {
        fs: 'empty'
    },
    resolve: {
        modules: [
            __dirname,
            'node_modules'
        ],
    },

    output: {
        publicPath: '',
        filename: '[name].js',
        path: path.resolve(__dirname, 'build')
    },
};