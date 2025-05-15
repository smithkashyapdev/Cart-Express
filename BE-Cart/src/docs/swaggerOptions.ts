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
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: [path.join(__dirname, '../routes/*.ts')], // path to route files with JSDoc comments
};

export const swaggerSpec = swaggerJsdoc(options);
