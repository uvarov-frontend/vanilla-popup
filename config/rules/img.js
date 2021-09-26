module.exports = {
	test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
	type: 'asset/resource',
	generator: {
		filename: (PathData) => PathData.filename.replace('src/', ''),
	},
};
