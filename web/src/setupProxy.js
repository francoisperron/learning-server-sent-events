const { createProxyMiddleware: proxy } = require('http-proxy-middleware')
const http = require('http');

module.exports = app => {
  const keepAliveAgent = new http.Agent({ keepAlive: true });
  app.use('/api', proxy({ target: 'http://localhost:3001', changeOrigin: true, agent: keepAliveAgent }))
}
