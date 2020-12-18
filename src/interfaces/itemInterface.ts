import { Document } from "mongoose";
export interface ItemInterface extends Document {
  name: string;
  description?: string;
  created_at: Date;
  productFeatures?: {
    [key: string]: string;
  };
}

export interface ItemInputInterface extends Document {
  name: string;
  description?: string;
  created_at?: Date;
  productFeatures?: {
    [key: string]: string;
  };
}
