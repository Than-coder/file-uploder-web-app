const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// config
const config = require('../config')

module.exports = {
    mode:'production',
    devServer:{
        port:config.clientPort,
        hot:true,
        historyApiFallback:true,
        proxy:{
            '/api':`http://localhost:${config.serverPort}`
        }
    },
    entry:'./src/index.js',
    output:{
        path:config.clientBuildPath,
        filename:'bundle.js',
        publicPath:'/'
    },
    module:{
        rules:[
            {
                test:/\.html$/,
                use:'html-loader'
            },
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:'babel-loader'
            },
            {
                test:/\.(jpg|png|svg|gift)$/,
                use:'file-loader'
            },
            {
                test:/\.scss$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({template:'./src/index.html'})
    ]
}