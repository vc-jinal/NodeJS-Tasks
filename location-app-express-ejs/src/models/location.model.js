import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
    {
        locationName: { type: String, unique: true, required: true },
        parentId: { type: mongoose.Schema.Types.ObjectId, default: null },
        productName: [{ type: String, default: "" }],
        childProductName: [{ type: String, default: "" }],
        placeIndex: { type: String, unique: true, required: true },
    },
    {
        timestamps: true,
    }
);

const Location = mongoose.model("Location", locationSchema, "locations");
export default Location;
