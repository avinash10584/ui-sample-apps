const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
    mode: 'production',
    entry: {
        vendor: [
            path.resolve(process.cwd(), 'src', 'vendor', 'sample-vendor-file.js'),
            'jquery',
        ],
        app: [
            path.resolve(process.cwd(), 'src', 'index.js'),
        ],
    },
    output: {
        filename: '[name].js',
        path: path.join(process.cwd(), 'dist'),
    },
    devServer: {
        publicPath: "/",
        contentBase: "./public",
        inline: true, // autorefresh
        port: 5005, // development port server
    },
    module: {
        rules: [
            {
                test: /\.js?$/, // search for js files 
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0', 'react'], // use es2015 and react
                },
            },
            {
                test: /\.(s)?css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.svg$/,
                use: 'svg-inline-loader',
            },
            {
                test: /\.(jpe?g|png|gif|ico)$/i,
                use: 'file-loader',
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'public' }
        ])
    ]
};

module.exports = config;
