import { Controller, Get, Param, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { serviceType } from './Types';
import { RealIP } from 'nestjs-real-ip';

@Controller('service')
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Register and update service route
   * @param  {serviceName/:serviceVersion/:servicePort`} `register/
   */
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
  /**
   * Get a service by service name and version
   * @param  {serviceName/:serviceVersion'} 'get/
   */
  @Get('get/:serviceName/:serviceVersion')
  getService(
    @Param('serviceName') serviceName: string,
    @Param('serviceVersion') serviceVersion: string,
  ): { serviceArrayItemType? } | string {
    const service: { serviceArrayItemType? } | null =
      this.appService.getService(serviceName, serviceVersion);

    if (service) return service;
    else return 'not found';
  }
  /**
   * List all services
   * @param  {} 'list'
   */
  @Get('list')
  listServices() {
    return this.appService.listServices();
  }
}
