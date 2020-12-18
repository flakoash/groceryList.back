import { model, Schema, Model } from "mongoose";
import { ImageInterface } from "../interfaces/imageInterface";

const imageSchema = new Schema({
  name: String,
  desc: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

export const ImageModel: Model<ImageInterface> = model("Images", imageSchema);
