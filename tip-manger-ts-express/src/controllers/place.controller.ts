import { Request, Response } from "express";
import Place from "../db/models/place.model";
import User from "../db/models/user.model";
import { AuthenticationRequest } from "../utils/jwt";
import mongoose from "mongoose";
import { ResponseHandler } from "../common/types";

// add Place Details
export const addPlace = async (req: AuthenticationRequest & Request, res: Response) => {
    try {
        const { placeName, billAmount, tipAmount } = req.body;

        const userExist = await User.findOne({ _id: req.id });
        if (!userExist) {
            return ResponseHandler(res, 404, "User Not Found");
        }

        const newPlaceDetails = {
            userId: req.id,
            placeName: placeName,
            billAmount: billAmount,
            tipAmount: tipAmount,
        };

        const addplaceDetails = await Place.create(newPlaceDetails);
        return ResponseHandler(res, 200, "Place Added Successfully", { addplaceDetails });
    } catch (error) {
        return ResponseHandler(res, 500, "Internal Server Error", [], [error]);
    }
};

// total tip given by user
export const totalTipByUser = async (req: AuthenticationRequest & Request, res: Response) => {
    try {
        const placeName = req.params.placeName;
        const totalTip = await Place.find(
            {
                userId: req.id,
                placeName: placeName,
            },
            {
                totalAmount: { $sum: ["$billAmount", "$tipAmount"] },
                placeName: 1,
                userId: 1,
            }
        );
        return ResponseHandler(res, 200, "Total Tip given by User", { totalTip });
    } catch (error) {
        return ResponseHandler(res, 500, "Internal Server Error", [], [error]);
    }
};

// repeated Tip Percentage
export const repeatedTipPercentage = async (req: AuthenticationRequest & Request, res: Response) => {
    try {
        const pipeline = await Place.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(req.id as string),
                },
            },
            {
                $addFields: {
                    tipPercentage: {
                        $multiply: [
                            {
                                $divide: ["$tipAmount", "$billAmount"],
                            },
                            100,
                        ],
                    },
                },
            },
            {
                $group: {
                    _id: "$tipPercentage",
                    visitedPlaceCount: { $count: {} },
                },
            },
            {
                $project: {
                    _id: 0,
                    // tipPercenatge: "$_id",
                    placeName: 1,
                    tipPercenatge: { $round: ["$_id", 2] },
                    // userId: 1,
                    visitedPlaceCount: 1,
                },
            },
            {
                $sort: { visitedPlaceCount: -1, tipPercenatge: -1 },
            },
            {
                $limit: 1,
            },
        ]);
        return ResponseHandler(res, 200, "Repeated Tip Percenatge", { pipeline });
    } catch (error) {
        return ResponseHandler(res, 500, "Internal Server Error", [], [error]);
    }
};

// most visited place by user
export const mostVisitedPlace = async (req: AuthenticationRequest & Request, res: Response) => {
    try {
        const pipeline = await Place.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(req.id as string),
                },
            },
            {
                $group: {
                    _id: "$placeName",
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    placeName: "$_id",
                    userId: 1,
                    count: 1,
                },
            },
            {
                $sort: { count: -1 },
            },
            {
                $limit: 1,
            },
        ]);
        return ResponseHandler(res, 200, "Repeated visited place", { pipeline });
    } catch (error) {
        return ResponseHandler(res, 500, "Internal Server Error", [], [error]);
    }
};
