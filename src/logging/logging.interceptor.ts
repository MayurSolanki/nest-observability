import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  //  constructor(private readonly requestService: RequestService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest(); //access to the request object
    const userAgent = request.get('user-agent') || ''; // user agent
    const { method, url, body, headers, ip } = request; // ip, method and url from the request.

    // get information from the request
    this.logger.log(
      `${method} ${url} ${userAgent} ${ip} }: ${context.getClass().name} ${
        context.getHandler().name
      } invoked...`,
    );

    this.logger.log(`${JSON.stringify(body)}  Request Body`);
    this.logger.log(`${headers}  Request headers`);

    const now = Date.now(); // get current time

    // get information from response
    return next.handle().pipe(
      tap({
        next: (responseBody: any): void => {
          const response = context.switchToHttp().getResponse();
          const { statusCode } = response;
          const contentLength = response.get('content-length');

          this.logger.log(
            `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip} : ${
              Date.now() - now
            }ms  Response Interceptor`,
          );

          this.logger.log('Response: ', JSON.stringify(responseBody));
        },
        error: (err: Error): void => {
          this.logger.error(err, 'Response Error Interceptor');
        },
      }),
    );
  }
}
