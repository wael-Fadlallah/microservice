import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import axios from 'axios';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 5002;
  await app.listen(port);

  const register = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5001/service/register/volumetric-weight/1.0.0/${port}`,
      );
      console.log(`service regsiteration status ${res.status}`);
    } catch (e) {
      console.error(`service registration error ${e.message}`);
    }
  };
  register();
  setInterval(register, 25000);
}
bootstrap();
