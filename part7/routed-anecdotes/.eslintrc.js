/*
 * @Author: Summer Lee
 * @Date: 2022-07-08 15:59:19
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-08 16:05:56
 */
module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
		'jest/globals': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended'
	],
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 2018,
		'sourceType': 'module'
	},
	'plugins': [
		'react', 'jest'
	],
	'rules': {
		'indent': [
			'error',
			'tab',
			{
				SwitchCase: 1,
				ignoredNodes: ['ConditionalExpression']
			}
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
		],
		'no-console': 0,
		'react/prop-types': 0,
		'react/react-in-jsx-scope': 'off'
	},
	'settings': {
		'react': {
			'version': 'detect'
		}
	}
}