import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClienteMatrizDocument = HydratedDocument<ClienteMatriz>;

@Schema()
export class ClienteMatriz {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  cpfcnpj: string;

  @Prop({ required: true })
  endereco: string;

  @Prop({ required: true })
  contato: string;

  @Prop({ type: [String], required: true })
  beneficios: string[];

  @Prop({ required: true, default: 'matriz' })
  tipoCliente: string;

  @Prop({ default: Date.now })
  dataCadastro: Date;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  senha: string;

  @Prop({ required: true })
  tempo: number;
}

export const ClienteMatrizSchema = SchemaFactory.createForClass(ClienteMatriz);
