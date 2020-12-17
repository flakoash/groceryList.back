import { Document } from "mongoose";
export interface ItemInterface extends Document {
  name: string;
  description: string;
  price: number;
  created_at: Date;
}

export interface ItemInputInterface extends Document {
  name: string;
  description: string;
  price?: number;
}
