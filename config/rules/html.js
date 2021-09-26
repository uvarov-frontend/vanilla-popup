module.exports = {
	test: /\.html$/i,
	enforce: 'post',
	loader: 'html-loader',
	options: {
		interpolate: true,
	},
};
