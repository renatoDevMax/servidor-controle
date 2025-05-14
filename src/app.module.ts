import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { MONGODB_URI } from './config/database.config';
import {
  ClienteMatriz,
  ClienteMatrizSchema,
} from './schemas/cliente-matriz.schema';
import {
  ClienteFiliado,
  ClienteFiliadoSchema,
} from './schemas/cliente-filiado.schema';
import { TempoService } from './services/tempo.service';

@Module({
  imports: [
    MongooseModule.forRoot(MONGODB_URI),
    MongooseModule.forFeature([
      { name: ClienteMatriz.name, schema: ClienteMatrizSchema },
      { name: ClienteFiliado.name, schema: ClienteFiliadoSchema },
    ]),
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [TempoService],
})
export class AppModule {}
