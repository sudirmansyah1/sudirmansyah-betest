import globals from 'globals';
import pluginJs from '@eslint/js';
import jest from 'eslint-plugin-jest';

export default [
	// Define a base configuration for JavaScript files
	{
		files: ['**/*.js'],
		languageOptions: {
			sourceType: 'commonjs', // Allows for CommonJS module syntax
			globals: {
				...globals.browser, // Define global variables for browser
				process: 'readonly', // Allow usage of process in Node.js
			},
		},
	},
	pluginJs.configs.recommended,

	// Jest configuration for test files
	{
		files: ['src/tests/**'],
		...jest.configs['flat/recommended'],
		rules: {
			...jest.configs['flat/recommended'].rules,
			'jest/prefer-expect-assertions': 'off', // Custom rule setting
		},
	},
	// Additional Jest rules for test files
	{
		files: ['src/tests/**'],
		rules: { 'jest/prefer-expect-assertions': 'off' },
	},
];
