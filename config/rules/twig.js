module.exports = {
	test: /\.twig$/i,
	use: [
		{
			loader: 'html-loader',
			options: {
				interpolate: true,
			},
		},
		{
			loader: 'twig-html-loader',
		},
	],
};
