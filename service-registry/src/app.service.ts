import { Injectable, ConsoleLogger } from '@nestjs/common';
import { serviceType } from './Types';

@Injectable()
export class AppService extends ConsoleLogger {
  services: { serviceArrayItemType? };
  timeout: number;
  constructor() {
    super();
    this.services = {};
    this.timeout = 30;
  }

  registerService(service: serviceType): string {
    this.cleanServiceList();
    const key = `${service.serviceName}${service.serviceVersion}${service.ip}`;

    if (!this.services[key]) {
      service.timestamp = Math.floor(Date.now() / 1000);
      this.services[key] = service;
      this.log(`register service key ${key}`);
    } else {
      this.services[key].timestamp = Math.floor(Date.now() / 1000);
      this.log(`update registered service key ${key}`);
    }
    return key;
  }

  listServices(): { serviceArrayItemType? } {
    this.cleanServiceList();
    return this.services;
  }

  getService(key: string): { serviceArrayItemType? } | string {
    this.cleanServiceList();
    if (!this.services[key]) return 'not found';
    return this.services[key];
  }

  cleanServiceList(): void {
    const now = Math.floor(Date.now() / 1000);

    Object.keys(this.services).forEach((key: string) => {
      if (this.services[key].timestamp + this.timeout < now) {
        delete this.services[key];
        this.log(`remove service ${key}`);
      }
    });
  }
}
