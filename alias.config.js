const path = require('path');
module.exports = {
	resolve: {
		alias: {
			'react-dom': '@hot-loader/react-dom',
			'@images': path.resolve(__dirname, './src/common-images/')
		}
	}
};