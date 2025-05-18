import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './src/config/db'
import authRoute from './src/routes/user-route'
import { logQueryStats } from './src/utils/query-stats';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './src/docs/swaggerOptions';
const { isMainThread, threadId } = require('worker_threads');

const cluster = require('cluster');
const os = require('os');
const numCPUs = os.cpus().length;


 dotenv.config();
    connectDB()

    const app = express();
    const PORT = process.env.PORT || 5000;
    const NODE_ENV = process.env.NODE_ENV || 'development';
    mongoose.set('debug', function (coll, method, query, doc, options) {
        const now = new Date().toISOString();
        console.log(`[🗃️ Mongo] ${now} - ${coll}.${method}(${JSON.stringify(query)})`);
    });
    // Swagger UI
    if (NODE_ENV !== 'production') {
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
        console.log(`📄 Swagger UI available at http://localhost:${PORT}/api-docs`);
    }

    app.use(logQueryStats);
    app.use(cors());
    app.use(express.json());
    app.use('/api/auth', authRoute);
    app.listen(PORT, () => {
        console.log(isMainThread, threadId, numCPUs)
        console.log(`Server running on port ${PORT}`)
    });



// if (cluster.isPrimary) {
//     console.log(`👑 Master process PID: ${process.pid}`);
//     console.log(`🔧 Forking ${numCPUs} workers...\n`);
//     for (let i = 0; i < numCPUs; i++) {
//         cluster.fork();
//     }
//     cluster.on('exit', (worker, code, signal) => {
//         console.error(`Worker ${worker.process.pid} died. Spawning a new one...`);
//         cluster.fork();
//     });
// } else {
   

// }