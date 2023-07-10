import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./user.model";

export interface IPlace extends Document {
    userId: IUser["_id"];
    placeName: string;
    billAmount: number;
    tipAmount: number;
}

const placeSchema = new Schema<IPlace>(
    {
        userId: { type: Schema.Types.ObjectId, required: true },
        placeName: { type: String, default: "" },
        billAmount: { type: Number },
        tipAmount: { type: Number },
    },
    {
        timestamps: true,
    }
);

const Place = mongoose.model<IPlace>("Place", placeSchema, "place");
export default Place;
