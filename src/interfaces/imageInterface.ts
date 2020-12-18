import { Document } from "mongoose";
export interface ImageInterface extends Document {
  name: string;
  desc: string;
  img: {
    data: Buffer;
    contentType: string;
  };
}
