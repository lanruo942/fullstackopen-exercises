/*
 * @Author: Summer Lee
 * @Date: 2022-03-21 12:18:39
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-03-21 12:27:18
 */
module.exports = {
	'env': {
		'node': true,
		'commonjs': true,
		'es2021': true
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