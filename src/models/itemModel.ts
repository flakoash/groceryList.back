import { model, Schema, Model } from "mongoose";
import { ItemInterface } from "../interfaces/itemInterface";

const ItemSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  productFeatures: {
    type: Map,
    of: String,
  },
});

export const Item: Model<ItemInterface> = model("Items", ItemSchema);
