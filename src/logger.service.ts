import { Injectable } from '@nestjs/common';
import winston, { createLogger, format } from 'winston';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const LokiTransport = require('winston-loki');

@Injectable()
export class LoggerService {
  private getConfig() {
    return {
      host: 'http://localhost:3100', // replace with your Loki instance URL
      json: true,
      labels: { job: 'NestObservability' }, // replace with your labels
      handleExceptions: true,
    };
  }
  private readonly logger = createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp(),
      format.json(),
      //LoggerService.logFormat(), // Add custom formatting
    ),
    transports: [
      new LokiTransport(this.getConfig()),
      new winston.transports.Console(),
    ],
    exitOnError: false,
  });

  info(message: string, context?: any): void {
    this.logger.info(message, { context });
  }

  error(message: string, trace?: any) {
    this.logger.error(message, { trace });
  }
}
