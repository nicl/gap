const { resolve } = require("path");

module.exports = () => ({
    entry: {
        "gap-core": "./src/gap-core/gap-core.ts",
        "gap-list": "./src/gap-list/gap-list.ts",
        "gap-proxy": "./src/gap-proxy/gap-proxy.ts",
        "gap-ab": "./src/gap-ab/gap-ab.ts",
        "gap-slot": "./src/gap-slot/gap-slot.ts",
        "gap-display": "./src/gap-display/gap-display.ts"
    },
    output: {
        path: resolve(__dirname, `./dist/`),
        filename: `[name].js`,
        chunkFilename: `[name].js`,
        libraryTarget: "global",
        pathinfo: true
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "babel-loader",
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        contentBase: resolve(__dirname, "./dist/"),
        compress: false,
        port: 3040
    },
    target: "web"
});
