import { model, Schema, Model, Document, Mongoose } from 'mongoose';
import { ItemInterface } from '../interfaces/itemInterface'

const ItemSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
});

export const Item: Model<ItemInterface & Document> = model("Items", ItemSchema);
