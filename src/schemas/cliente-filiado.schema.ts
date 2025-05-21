import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClienteFiliadoDocument = HydratedDocument<ClienteFiliado>;

@Schema({ collection: 'clienteFiliado' })
export class ClienteFiliado {
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

  @Prop({ required: true, default: 'filiado' })
  tipoCliente: string;

  @Prop({ required: true })
  matriz: string;

  @Prop({ type: [String], required: true })
  beneficioMatriz: string[];

  @Prop({ default: Date.now })
  dataCadastro: Date;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  senha: string;

  @Prop({ type: Number, required: true })
  tempo: number;
}

export const ClienteFiliadoSchema =
  SchemaFactory.createForClass(ClienteFiliado);
