const path = require('path');
const { merge: webpackMerge } = require('webpack-merge');
const baseComponentConfig = require('@splunk/webpack-configs/component.config').default;

module.exports = webpackMerge(baseComponentConfig, {
    entry: {
        AttackMessage: path.join(__dirname, 'src/AttackMessage.jsx'),
    },
    output: {
        path: path.join(__dirname),
    },
});
