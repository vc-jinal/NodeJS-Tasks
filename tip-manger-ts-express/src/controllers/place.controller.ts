import { Router, Request, Response } from "express";
import Place from "../db/modules/post.module";
import User from "../db/modules/user.module";
import { AuthenticationRequest } from "../utils/jwt";
import mongoose, { Types } from "mongoose";

export const addPlace: any = async (req: AuthenticationRequest, res: Response) => {
    try {
        const { placeName, billAmount, tipAmount } = req.body;

        const userExist = await User.findOne({ _id: req.id });
        if (!userExist) {
            return res.send({ statusCode: 404, message: "User Not Found" });
        }

        const newPlaceDetails = {
            userId: req.id,
            placeName: placeName,
            billAmount: billAmount,
            tipAmount: tipAmount,
        };

        const addplaceDetails = await Place.create(newPlaceDetails);
        return res.send({ statusCode: 200, message: "Place Added Successfully", placeDetails: addplaceDetails });
    } catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server Error" });
    }
};

export const totalTipByUser: any = async (req: AuthenticationRequest, res: Response) => {
    try {
        const placeName = req.params.placeName;
        const totalTip = await Place.find(
            {
                userId: req.id,
                // userId: new Types.ObjectId(req.id),
                placeName: placeName,
            },
            {
                totalAmount: { $sum: ["$billAmount", "$tipAmount"] },
                placeName: 1,
                userId: 1,
            }
        );
        return res.send({ StatusCode: 200, message: "Total Tip given by User", totalTip: totalTip });
    } catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server Error" });
    }
};

// repeated Tip Percentage
export const repeatedTipPercentage: any = async (req: AuthenticationRequest, res: Response) => {
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
                    // count: { $sum: 1 },
                    visitedPlaceCount: { $count: {} },
                },
            },
            {
                $project: {
                    // tipPercenatge: "$_id",
                    tipPercenatge: 1,
                    placeName: 1,
                    visitedPlaceCount: 1,
                },
            },
            {
                $sort: { visitedPlaceCount: -1 },
            },
            {
                $limit: 1,
            },
        ]);
        return res.send({ statusCode: 200, message: "Repeated Tip Percenatge", repeatedTipPercent: pipeline });
    } catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server Error" });
    }
};

// most visited place by user
export const mostVisitedPlace: any = async (req: AuthenticationRequest, res: Response) => {
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
                $sort: { count: -1 },
            },
            {
                $limit: 1,
            },
            {
                $project: {
                    placeName: 1,
                    userId: 1,
                    count: 1,
                },
            },
        ]);
        return res.send({ statusCode: 200, message: "Repeated visited place", repeatedVisitedPlace: pipeline });
    } catch (error) {
        return res.send({ statusCode: 500, message: "Internal Server Error" });
    }
};
