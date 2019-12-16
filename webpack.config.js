const path = require("path");

module.exports = {
    entry: {
        slideshow: "./src/js/slideshow.js"
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    },
    devtool: "source-map"
};