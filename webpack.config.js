// TODO: Webpack is quite slow, could we use something else?
module.exports = {
    entry: "./src/index.ts",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    mode: "production",
    output: {
        filename: "bundle.js",
    }
}
