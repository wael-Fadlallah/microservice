import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ItemType } from './types/index';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  calcVolumetricWeight(): any {
    const dummyPackages: Array<ItemType> = this.dummyPackagesFactory();
    return this.appService.calcVolumetricWeight(dummyPackages);
  }

  dummyPackagesFactory(): Array<ItemType> {
    return Array.from({ length: 5 }, () => ({
      width: this.randomNumber(),
      height: this.randomNumber(),
      length: this.randomNumber(),
    }));
  }

  randomNumber(): number {
    return Math.random() * (100 - 50) + 50;
  }
}
