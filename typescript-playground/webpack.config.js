module.exports = {
    entry: './app.ts',
    output: { filename: 'bundle.js' },
    resolve: {
        extensions: ['.ts']
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    },
    mode: 'development',
    devtool: 'source-map'
};