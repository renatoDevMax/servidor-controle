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

  @Cron('0 26 2 * * *', {
    timeZone: 'America/Sao_Paulo',
    name: 'atualizacao-tempo-diaria',
  })
  async atualizarTempo() {
    try {
      console.log('Iniciando atualização de tempo...');

      // Atualiza o tempo de todos os clientes matriz
      const clientesMatriz = await this.clienteMatrizModel.find({
        tempo: { $gt: 0 },
      });
      for (const cliente of clientesMatriz) {
        await this.clienteMatrizModel.updateOne({ _id: cliente._id }, [
          {
            $set: {
              tempo: {
                $max: [{ $subtract: ['$tempo', 1] }, 0],
              },
            },
          },
        ]);
        console.log(
          `Tempo decrementado para o cliente matriz: ${cliente.nome}`,
        );
      }

      // Atualiza o tempo de todos os clientes filiados
      const clientesFiliados = await this.clienteFiliadoModel.find({
        tempo: { $gt: 0 },
      });
      for (const cliente of clientesFiliados) {
        await this.clienteFiliadoModel.updateOne({ _id: cliente._id }, [
          {
            $set: {
              tempo: {
                $max: [{ $subtract: ['$tempo', 1] }, 0],
              },
            },
          },
        ]);
        console.log(
          `Tempo decrementado para o cliente filiado: ${cliente.nome}`,
        );
      }

      console.log('Atualização de tempo realizada com sucesso:');
      console.log(`Clientes Matriz atualizados: ${clientesMatriz.length}`);
      console.log(`Clientes Filiados atualizados: ${clientesFiliados.length}`);
    } catch (error) {
      console.error('Erro ao atualizar tempo dos clientes:', error);
    }
  }
}
