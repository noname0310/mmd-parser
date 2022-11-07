import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";

module.exports = {
    entry: "./test/index.ts",
    output: {
        path: path.join(__dirname, "/testbundle"),
        filename: "[name].bundle.js",
        assetModuleFilename: "images/[name][ext]",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
            },
            {
                test: /\.(png|jpg|gif)$/,
                type: "asset",
            }
        ],
    },
    resolve: {
        modules: ["src", "node_modules"],
        extensions: [".ts"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./test/index.html"
        }),
        new ESLintPlugin({
            extensions: ["ts"]
        })
    ],
    devServer: {
        host: "0.0.0.0",
        port: 20310,
        allowedHosts: [
            "nonamehome.iptime.org"
        ],
        client: {
            logging: "none"
        }
    },
    mode: "development"
};
