import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Flipkart Clone API',
      version: '1.0.0',
      description: 'API documentation for Flipkart Clone App',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  // ✅ Ensure this glob pattern correctly resolves all route files
  apis: [path.join(__dirname, '../routes/**/*.ts')], // recursively include all .ts in routes/
};

export const swaggerSpec = swaggerJsdoc(options);
