const Path = require("path");

module.exports = {
    entry: "./src/views/index.js",
    output: {
        filename: "app.js",
        path: Path.resolve(__dirname, "public/js")
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
};