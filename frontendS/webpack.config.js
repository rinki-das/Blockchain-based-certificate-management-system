
const path = require('path');
const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      http: false, // Disable the http module
    },
  },
};
