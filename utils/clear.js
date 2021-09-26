/* eslint-disable import/no-extraneous-dependencies */
const clearDir = require('clear-dir');

clearDir(`${__dirname}/../build`, () => {
	console.log('Catalog clear!');
});
