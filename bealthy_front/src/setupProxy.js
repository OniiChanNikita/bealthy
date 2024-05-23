const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/research_image',
    createProxyMiddleware({
      target: 'https://v2.exercisedb.io/image', // Замените 'http://example.com' на адрес вашего сервера
      changeOrigin: true,
      pathRewrite: {
        '^/research_image': '', // Удаление пути /exercisedb из запроса
      },
      responseType: 'arraybuffer'
    })
  );
};
/*https://v2.exercisedb.io/image/vKAWsPzehvwbAa*/