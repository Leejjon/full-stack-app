// Name this "path2" to not clash with the path variable in the index.ts
const path2 = require("path");
const nodeExternals = require("webpack-node-externals");
const copyFiles = require('copy-webpack-plugin');

module.exports = {
    entry: './index.ts',
    target: "node",
    mode: "production",
    externals: [nodeExternals()],
    resolve: {
        extensions: ['.ts']
    },
    module: {
        rules: [
            // all files with a `.ts` extension will be handled by `ts-loader`
            {test: /\.ts$/, use: {loader: 'ts-loader', options: {projectReferences: true}}, exclude: /node_modules/}
        ]
    },
    plugins: [new copyFiles({patterns: [{from: '../frontend/build', to: 'build'}]})],
    output: {
        path: path2.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
};
