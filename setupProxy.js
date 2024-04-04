const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://demo2.z-bit.ee',
      changeOrigin: true,
    })
  );
};
