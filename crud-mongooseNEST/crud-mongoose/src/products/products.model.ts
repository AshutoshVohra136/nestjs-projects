import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true }, // js type
  description: { type: String, required: true },
  price: { type: Number, required: true },
});
export interface Product extends mongoose.Document{
  id: string; // typescript type
  title: string;
  description: string;
  price: number;
}
