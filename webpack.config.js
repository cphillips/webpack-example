module.exports = {
    entry: {
        app1: "./app1/app1.js",
        app2: "./app2/app2.js"
    },
    output: {
        path: __dirname + '/build',
        filename: '[name].js',
    }
};