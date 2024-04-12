const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = () => {
    const isDevelopment = process.env.mode === 'development';

    return {
        mode: process.env.mode,
        entry: './src/index.ts',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
        },
        devServer: {
            compress: true,
            open: true,
            port: 8080,
            host: '0.0.0.0',
        },
        performance: { hints: false },
        devtool: isDevelopment ? 'eval-source-map' : undefined,
        optimization: {
            minimize: !isDevelopment,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        ecma: 6,
                        compress: { drop_console: true },
                        output: { comments: false, beautify: false },
                    },
                }),
            ],
        },
        module: {
            rules: [
                {
                    test: /\.ts(x)?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.ts', '.js'],
        },
        plugins: [
            new CopyPlugin({
                patterns: [{ from: 'static/assets/', to: 'assets' }, { from: 'static/styles.css' }],
            }),
            new HtmlWebpackPlugin({
                template: 'static/index.html',
                hash: true,
                minify: false,
            }),
        ],
    }
}