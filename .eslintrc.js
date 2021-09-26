module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'airbnb-base',
		'plugin:vue/essential',
	],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: [
		'vue',
	],
	rules: {
		'max-len': ['error', { code: 180 }],
		'class-methods-use-this': 'off',
		'no-tabs': 'off',
		'no-param-reassign': 'off',
		'import/extensions': 'off',
		'prefer-destructuring': ['error', { object: true, array: false }],
		indent: ['error', 'tab', { SwitchCase: 1 }],
	},
};
