import { Controller, Get, Param, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { serviceType } from './Types';
import { RealIP } from 'nestjs-real-ip';

@Controller('service')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Put(`register/:serviceName/:serviceVersion/:servicePort`)
  registerService(@Param() params: serviceType, @RealIP() ip: string): string {
    const { serviceName, serviceVersion, servicePort } = params;
    const service: serviceType = {
      serviceName,
      serviceVersion,
      servicePort,
      ip,
    };
    return this.appService.registerService(service);
  }

  @Get('get/:key')
  getService(@Param('key') key: string) {
    return this.appService.getService(key);
  }

  @Get('list')
  listServices() {
    return this.appService.listServices();
  }
}
