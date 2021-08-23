//
// setupProxy.js -  create a development environment proxy
//                  (between the client and the server)
//
// Note: this proxy doesn't appear in the production build.
//
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    ['/auth', '/api'],
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};
