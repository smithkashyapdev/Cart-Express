import { Request, Response, NextFunction } from 'express';

export const logQueryStats = async (req: Request, res: Response, next: NextFunction) => {
  const startTime = process.hrtime();

  res.on('finish', () => {
    const [seconds, nanoseconds] = process.hrtime(startTime);
    const durationMs = (seconds * 1000 + nanoseconds / 1e6).toFixed(2);

    console.log(`[📥] ${req.method} ${req.originalUrl}`);
    console.log(`[⏱️] Response time: ${durationMs}ms`);
    console.log(`[🧵] Handled by PID: ${process.pid}`);
    console.log(`[📅] Time: ${new Date().toISOString()}`);
    console.log('------------------------------');
  });

  next();
};