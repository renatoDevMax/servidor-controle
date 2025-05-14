import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { ClienteMatriz } from '../schemas/cliente-matriz.schema';
import { ClienteFiliado } from '../schemas/cliente-filiado.schema';

@Injectable()
export class TempoService {
  constructor(
    @InjectModel(ClienteMatriz.name)
    private clienteMatrizModel: Model<ClienteMatriz>,
    @InjectModel(ClienteFiliado.name)
    private clienteFiliadoModel: Model<ClienteFiliado>,
  ) {}

  @Cron('0 23 * * *', {
    timeZone: 'America/Sao_Paulo',
  })
  async atualizarTempo() {
    try {
      // Atualiza o tempo de todos os clientes matriz
      const resultadoMatriz = await this.clienteMatrizModel.updateMany(
        { tempo: { $gt: 0 } }, // Apenas atualiza se tempo for maior que 0
        { $inc: { tempo: -1 } }, // Decrementa 1 do valor atual
      );

      // Atualiza o tempo de todos os clientes filiados
      const resultadoFiliado = await this.clienteFiliadoModel.updateMany(
        { tempo: { $gt: 0 } }, // Apenas atualiza se tempo for maior que 0
        { $inc: { tempo: -1 } }, // Decrementa 1 do valor atual
      );

      console.log('Atualização de tempo realizada com sucesso:');
      console.log(
        `Clientes Matriz atualizados: ${resultadoMatriz.modifiedCount}`,
      );
      console.log(
        `Clientes Filiados atualizados: ${resultadoFiliado.modifiedCount}`,
      );
    } catch (error) {
      console.error('Erro ao atualizar tempo dos clientes:', error);
    }
  }
}
