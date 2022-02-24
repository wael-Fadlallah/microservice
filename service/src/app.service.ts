import { Injectable } from '@nestjs/common';
import { ItemType } from './types/index';

@Injectable()
export class AppService {
  /**
   * Using the provided equation to get the total packages weight then sum the total
   * @param  {Array<ItemType>} packages
   */
  calcBoxSize(packages: Array<ItemType>): {
    packagesSize: number;
    randomBoxSize: number;
  } {
    const packagesSize = packages
      .map((item: ItemType) =>
        Math.floor((item.weight * item.height * item.length) / 5000),
      )
      .reduce((sum, curr) => (sum += curr));
    const randomBoxSize = packagesSize + 100;
    return { packagesSize, randomBoxSize };
  }
}
