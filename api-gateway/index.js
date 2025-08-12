const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Routes
app.use('/students', createProxyMiddleware({
    target: 'http://student-service:5001',
    changeOrigin: true
}));

app.use('/courses', createProxyMiddleware({
    target: 'http://course-service:5002',
    changeOrigin: true
}));


app.listen(5000,'0.0.0.0',() => {
    console.log('API Gateway running on port 5000');
});
