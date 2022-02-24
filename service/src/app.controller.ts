import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ItemType } from './types/index';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  /**
   * Decide if the order items will fit on a box or not
   * for demonstration purposes we will asume that it will fit
   * @body order?
   * @body randomize
   * @returns Object
   */
  //   {
  //     "order": [
  //         {
  //             "width": 12,
  //             "height": 123,
  //             "length": 13
  //         }
  //     ]
  // }
  @Post()
  calcBoxSize(
    @Body('order') order: Array<ItemType>,
    @Body('randomize') randomize: boolean,
  ): any {
    if (!order && !randomize)
      throw new BadRequestException(
        'kindly provide object named order with value of array of products with properties width, height and length all numbers or set randomize equal to true in the request body',
      );
    if (!order && randomize) order = this.dummyPackagesFactory();
    const dummyPackages: Array<ItemType> = order;
    const { packagesSize, randomBoxSize } =
      this.appService.calcBoxSize(dummyPackages);
    return {
      willFit: true,
      randomBoxSize,
      packagesSize,
    };
  }
  /**
   * A function that I used to get a random number of packages for testing purposes.
   * @returns Array
   */
  dummyPackagesFactory(): Array<ItemType> {
    return Array.from({ length: 5 }, () => ({
      weight: this.randomNumber(),
      height: this.randomNumber(),
      length: this.randomNumber(),
    }));
  }
  /**
   * Nothing fancy here, just a function to get a random number between 50 and 100
   * @returns number
   */
  randomNumber(): number {
    return Math.random() * (100 - 50) + 50;
  }
}
