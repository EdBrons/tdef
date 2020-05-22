const path = require('path');

module.exports = {
  entry: './src/client/client.js',
  mode: 'development',
  watch: true,
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};