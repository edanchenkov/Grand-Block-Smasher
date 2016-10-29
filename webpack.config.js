module.exports = {
    entry : './src/app.js',
    output : {
        path : './bundles',
        filename : 'app.bundle.js'
    },
    devtool : 'source-map',
    module : {
        loaders : [
            {
                test : /\.js$/,
                exclude : /node_modules/,
                loader : 'babel-loader'
            },
            {
                test : /\.scss$/,
                loaders : ['style', 'css?sourceMap', 'sass?sourceMap']
            }
        ]
    },
    resolve : {
        alias : {
            'vue$' : 'vue/dist/vue.js'
        }
    }
};
