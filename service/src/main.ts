import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import axios from 'axios';
import { ConsoleLogger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 5002;
  app.enableCors();
  await app.listen(port);
  const logger = new ConsoleLogger();

  /**
   * Send a request to the service registey to keep this service a live
   */
  const register = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5001/service/register/volumetric-weight/1.0.0/${port}`,
      );
      logger.log(`service regsiteration status ${res.status}`);
    } catch (e) {
      logger.error(`service registration error ${e.message}`);
    }
  };

  register();
  setInterval(register, 20000);
}
bootstrap();
