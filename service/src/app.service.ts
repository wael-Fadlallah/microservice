import { Injectable } from '@nestjs/common';
import { ItemType } from './types/index';

@Injectable()
export class AppService {
  // length x width x height /5000
  calcVolumetricWeight(packages: Array<ItemType>): Array<number> {
    return packages.map((item: ItemType) =>
      Math.floor((item.width * item.height * item.length) / 5000),
    );
  }
}
