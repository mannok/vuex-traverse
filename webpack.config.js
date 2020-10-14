const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env = {}) => ({
	mode: env.prod ? 'production' : 'development',
	devtool: env.prod ? 'source-map' : 'cheap-module-eval-source-map',
	entry: path.resolve(__dirname, './src/main.ts'),
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: '/'
	},
	resolve: {
		alias: {
			// this isn't technically needed, since the default `vue` entry for bundlers
			// is a simple `export * from '@vue/runtime-dom`. However having this
			// extra re-export somehow causes webpack to always invalidate the module
			// on the first HMR update and causes the page to reload.
			vue: '@vue/runtime-dom',
			'@': path.join(__dirname, './src')
		},
		extensions: ['.js', '.ts']
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: 'ts-loader',
				options: { appendTsSuffixTo: [/\.vue$/] }
			},
			{
				test: /\.vue$/,
				use: 'vue-loader'
			},
			{
				test: /\.(png|svg)$/,
				use: {
					loader: 'url-loader',
					options: { limit: 8192 }
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000
				}
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: { hmr: !env.prod }
					},
					'css-loader'
				]
			}
			// {
			// 	test: require.resolve('mdb-ui-kit'),
			// 	loader: 'expose-loader',
			// 	options: {
			// 		exposes: ['mdb']
			// 	}
			// }
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			template: './index.html',
			filename: 'index.html'
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		new CopyWebpackPlugin([{ from: path.resolve('./static'), to: 'static' }]),
		new CleanWebpackPlugin()
	],
	devServer: {
		historyApiFallback: true,
		inline: true,
		hot: true,
		stats: 'minimal',
		contentBase: __dirname,
		overlay: true
	}
});
