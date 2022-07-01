/*
 * @Author: Summer Lee
 * @Date: 2022-07-01 17:33:03
 * @LastEditors: Summer Lee
 * @LastEditTime: 2022-07-01 17:34:10
 */
const { defineConfig } = require("cypress");

module.exports = defineConfig({
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
});
