const webpack = require('webpack');
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin");
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const ASSET_PATH = process.env.ASSET_PATH || '/';

const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'
console.log(ASSET_PATH)
///generators
const pluginsGenerator = () => {
    let myPlugins = [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: isProd
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: isDev ? '[name].css' : '[name].[contenthash].css'
        }),
        new webpack.DefinePlugin({
            'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
        })

    ]
    if (isDev) {
        // only enable hot in development
        myPlugins.push(new webpack.HotModuleReplacementPlugin());
    }
    if(isProd) {
        myPlugins.push(new BundleAnalyzerPlugin())
    }
    return myPlugins
}
const optimizationGenerator = () => {
    let myOptimization = {
        splitChunks: {
            chunks: 'all'
        }
    }
    if (isProd) {
        myOptimization.minimizer = [
            new OptimizeCssAssetWebpackPlugin(),
            new TerserPlugin()
        ]
    }
    return myOptimization
}

// const rulesCreator = (ext = 'css') => {
//     let regExp = new RegExp('/\.' + ext + '$/i')
//     console.log('regExp' + regExp)
//     let useLoader = {
//         test: regExp,
//         use: [{
//             loader: MiniCssExtractPlugin.loader,
//             options: {
//                 publicPath: ASSET_PATH
//             }
//         },
// {loader: 'css-loader'}
//         ]
//     }
//      useLoader.use.push({ loader: `${ext}-loader` })
//     
//     console.log(`${ext} + ${extraLoader}` + useLoader.use[1].loader)
//     return useLoader
// }

const optionsBabelCreator = add => {
    let options = {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties']
    }
    add && options.presets.push(`@babel/preset-${add}`)
    return options
} 

const jsLoadersCreator = () => {
    let loaders = [ {
        loader: "babel-loader",
        options: optionsBabelCreator()
    }]
    isDev && loaders.push({ loader: "eslint-loader"})
    return loaders
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './index.jsx'],
        analytics: './analytics.ts'
    },
    output: {
        filename: isDev ? '[name].bundle.js' : '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: ASSET_PATH
    },
    resolve: {
        extensions: ['.js', '.json', '.css'],
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: optimizationGenerator(),
    devServer: {
        port: 4200
    },
    devtool: isDev ? 'source-map' : undefined,
    plugins: pluginsGenerator(),
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: ASSET_PATH }
                    },
                    { loader: 'css-loader' }
                ]
            },
            {
                test: /\.less$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: ASSET_PATH }
                    },
                    { loader: 'css-loader' },
                    { loader: 'less-loader' },
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: ASSET_PATH }
                    },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' },

                ]
            },
            {
                test: /\.(gif|jpg|png|svg)$/i,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff)$/i,
                use: ['file-loader']
            },
            {
                test: /\.csv$/i,
                use: ['csv-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: jsLoadersCreator()
            },
            {
                test: /\.m?ts$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: optionsBabelCreator('typescript')
                }
            },
            {
                test: /\.m?jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: optionsBabelCreator('react')
                }
            },

        ]
    }
}