/*
 * @Author: Summer Lee
 * @Date: 2022-04-11 15:53:53
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-04-11 16:19:19
 */
module.exports = {
	'env': {
		'node': true,
		'commonjs': true,
		'es2021': true,
		'jest': true
	},
	'extends': 'eslint:recommended',
	'parserOptions': {
		'ecmaVersion': 'latest'
	},
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'never'
		],
		'eqeqeq': 'error',
		'no-trailing-spaces': 'error',
		'no-unused-vars': 'off',
		'object-curly-spacing': [
			'error',
			'always'
		],
		'arrow-spacing': [
			'error',
			{
				'before': true,
				'after': true
			}
		]
	}
}
