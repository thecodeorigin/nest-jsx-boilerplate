import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { ErrorMessage } from '../enums/error-message.enum';

@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter<HttpException> {
  catch(exception: any, host: ArgumentsHost) : any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const statusCode = exception.getStatus();
    const customResponse : any = exception.getResponse();
    switch (statusCode) {
      case 400:
        return response.status(statusCode).json({
          statusCode,
          message: customResponse.message || ErrorMessage.BAD_REQUEST
        });
      case 401:
        return response.status(statusCode).json({
          statusCode,
          message: customResponse.message || ErrorMessage.UNAUTHORIZED
        });
      case 403:
        return response.status(statusCode).json({
          statusCode,
          message: customResponse.message || ErrorMessage.FORBIDDEN
        });
      case 404:
        return response.status(statusCode).json({
          statusCode,
          message: customResponse.message || ErrorMessage.NOT_FOUND
        });
      case 409:
        return response.status(statusCode).json({
          statusCode,
          message: customResponse.message || ErrorMessage.CONFLICTED
        });
      case 500:
        return response.status(statusCode).json({
          statusCode,
          message: customResponse.message || ErrorMessage.INTERNAL_SERVER_ERROR
        });
      default:
        console.log(exception);
        return response.status(exception.getStatus()).json({
          statusCode: exception.getStatus(),
          message: exception.getResponse()
        });
    }
  }
}
