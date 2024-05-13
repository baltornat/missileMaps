const path = require('path');
const { merge: webpackMerge } = require('webpack-merge');
const baseComponentConfig = require('@splunk/webpack-configs/component.config').default;

module.exports = webpackMerge(baseComponentConfig, {
    entry: {
        ExecutionDate: path.join(__dirname, 'src/ExecutionDate.jsx'),
    },
    output: {
        path: path.join(__dirname),
    },
});
