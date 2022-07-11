/*
 * @Author: Summer Lee
 * @Date: 2022-06-25 14:35:44
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-11 19:39:55
 */
/* eslint-env node */
module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
		'jest/globals': true,
		'cypress/globals': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended',
		'prettier'
	],
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 2018,
		'sourceType': 'module'
	},
	'plugins': [
		'react', 'jest', 'cypress'
	],
	'rules': {
		'quotes': [
			'error',
			'single',
			{
				'avoidEscape': true,
				'allowTemplateLiterals': false
			}
		],
		'eqeqeq': 'error',
		'no-unused-vars': 'off',
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