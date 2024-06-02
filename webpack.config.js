const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
const test = require("node:test");

const dist = path.resolve(__dirname, "dist");

module.exports = {
    mode: "production",
    entry: "./js/index.js",
    output: {
        path: dist,
        filename: "index.js"
    },
    devServer: {
        static: {
            directory: dist,
        }
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {to: dist, from: path.resolve(__dirname, "static")}
            ]
        }),

        new WasmPackPlugin({
            crateDirectory: __dirname,
        }),
    ],
    experiments: {
        asyncWebAssembly: true,
    },
    performance: {
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
    }
};
