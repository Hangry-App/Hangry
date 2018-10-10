const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: "development",
    entry: ["@babel/polyfill", "./sourceRefactor.js"],
    target: "node",
    output: {
        path: __dirname,
        filename: "./index.js"
    },
    externals: [nodeExternals()],
    module: {
        rules: [{
            test: /\.js$/,
            use: "babel-loader",
            exclude: /node_modules/
        }]
    },
}