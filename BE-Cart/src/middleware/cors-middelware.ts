const cors = require('cors');

export const corsMiddleware = cors({
  origin: ['http://localhost:3000', 'https://your-frontend.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
})