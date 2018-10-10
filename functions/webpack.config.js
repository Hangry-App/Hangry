const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: "development",
    entry: ["@babel/polyfill", "./sourceRefactor.js"],
    target: "node",
    output: {
        path: __dirname,
        filename: "./bundle.js"
    },
    externals: [nodeExternals()]
}