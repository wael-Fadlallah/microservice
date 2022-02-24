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
  /**
   * Register a new service or update the timestamp if the service already exists.
   * @param  {serviceType} service
   * @returns string
   */
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
  /**
   * List all the live services.
   * @returns serviceArrayItemType
   */
  listServices(): { serviceArrayItemType? } {
    this.cleanServiceList();
    return this.services;
  }
  /**
   * Get a service by service name and version
   * @param  {string} serviceName
   * @param  {string} serviceVersion
   * @returns the service as an object or false
   */
  getService(
    serviceName: string,
    serviceVersion: string,
  ): { serviceArrayItemType? } | null {
    this.cleanServiceList();
    const candidate: { serviceArrayItemType } = Object.values(
      this.services,
    ).find((service) => {
      return (
        service.serviceName === serviceName &&
        service.serviceVersion === serviceVersion
      );
    });
    if (!candidate) return null;
    return candidate;
  }
  /**
   * Delete any service that have stayed silance for a defined amount of time
   * runs whenever we register or get a service
   * @returns void
   */
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
