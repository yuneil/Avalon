var webpack = require('webpack')

module.exports = {
    entry: './static/scripts/index.js',
    output: {
        path: 'static/build',
        filename: 'bundle.js'
            // filename: '[name]-[chunkhash:6].js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.(png|jpg)$/, loader: 'url?limit=40000' }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
    },
}