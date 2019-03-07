const path = require('path');

const config = {
    mode: 'development',
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
        hot: true,
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
};

module.exports = config;
