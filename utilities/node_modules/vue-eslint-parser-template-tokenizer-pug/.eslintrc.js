module.exports = {
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	extends: [
		'standard'
	],
	// add your custom rules here
	rules: {
		'arrow-parens': 0,
		'generator-star-spacing': 0,
		'no-debugger': 'off',
		indent: [2, 'tab', { SwitchCase: 1 }],
		'no-tabs': 0,
		'comma-dangle': 0,
		curly: 0,
		'no-return-assign': 0,
		'no-console': 'off'
	},
	globals: {
	},
	env: {
		node: true
	}
}
