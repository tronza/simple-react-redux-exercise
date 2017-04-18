module.exports = {
    entry: __dirname + '/src/index.js',
    output: {
        path: __dirname + '/public/',
        filename: 'index.js',
        publicPath: '/dist/'
    },

    devServer: {
        inline: true,
        port: 8666
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'stage-2']
                }
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx']
    }
};