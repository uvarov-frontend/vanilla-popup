/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable quote-props */
/* eslint-disable import/no-extraneous-dependencies */

const fs = require('fs');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = require('./paths');

const RULES = [];
fs.readdirSync(PATHS.rules).filter((filename) => RULES.push(require(`${PATHS.rules}/${filename}`)));

const PAGES_ENTRY = {};
const PAGES_DIR = `${PATHS.src}/${PATHS.assets.templates}/${PATHS.assets.pages}`;

PAGES_ENTRY.main = `${PATHS.src}/main.js`;

const PAGES = fs.readdirSync(PAGES_DIR).filter((filename) => {
	if (filename.endsWith('.pug') || filename.endsWith('.twig') || filename.endsWith('.html')) {
		const PAGE_EXT = `.${filename.split('.').pop()}`;
		filename = filename.replace(PAGE_EXT, '').replace('.html', '');
		PAGES_ENTRY[filename.replace(PAGE_EXT, '')] = `${PATHS.src}/${PATHS.assets.pages}/${filename.replace(PAGE_EXT, '')}.js`;
		return filename;
	}
	return false;
});

module.exports = {
	externals: {
		paths: PATHS,
	},
	mode: process.env.NODE_ENV,
	entry: PAGES_ENTRY,
	output: {
		path: PATHS.output,
		clean: true,
		publicPath: '/',
	},
	resolve: {
		alias: {
			'~': PATHS.src,
			img: `${PATHS.src}/${PATHS.assets.img}`,
		},
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
					enforce: true,
				},
			},
		},
	},
	module: {
		rules: RULES,
	},
	plugins: [
		new VueLoaderPlugin(),
		new CopyWebpackPlugin({
			patterns: [{
				from: `${PATHS.src}/${PATHS.assets.static}`,
				to: PATHS.output,
			}],
		}),
		...PAGES.map(
			(page) => {
				const PAGE_NAME = page.replace('.pug', '').replace('.twig', '').replace('.html', '');
				return new HtmlWebpackPlugin({
					template: `${PAGES_DIR}/${page}`,
					filename: `./${PAGE_NAME}.html`,
					chunks: ['main', `${PAGE_NAME}`],
					scriptLoading: 'blocking',
					base: '/',
				});
			},
		),
	],
};
