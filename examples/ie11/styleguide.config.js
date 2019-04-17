const webpackConfig = require('./webpack.config');

/**
 * NOTE: To support IE11, transform all react-styleguidist modules and dependencies.
 *   without this config, IE11 throws Syntax errors from the following libraries:
 * - acorn - class syntax
 * - regexpu-core - arrow function
 * - unicode-match-property-ecmascript - string interpolation
 * - unicode-match-property-value-ecmascript - string interpolation
 * - react-dev-utils - module syntax and arrow function in `strip-ansi`, `ansi-regex`
 * - ansi-styles - arrow function
 * - ansi-regex - arrow function
 * - chalk - const usage in for...of (Runtime error : const must be initialized)
 * - strip-ansi - arrow function
 */
const TRANSFORMS_FOR_IE11 = {
	test: /\.jsx?$/,
	include: /node_modules\/(?=(acorn-jsx|regexpu-core|unicode-match-property-ecmascript|unicode-match-property-value-ecmascript|react-dev-utils|ansi-styles|ansi-regex|chalk|strip-ansi)\/).*/,
	use: {
		loader: 'babel-loader',
		options: {
			presets: [
				[
					'@babel/preset-env',
					{
						targets: {
							ie: '11',
						},
					},
				],
			],
		},
	},
};
webpackConfig.module.rules = [TRANSFORMS_FOR_IE11, ...webpackConfig.module.rules];

module.exports = {
	title: 'React Style Guide Example',
	components: 'src/components/**/*.js',
	webpackConfig,
	require: ['core-js'],
};
