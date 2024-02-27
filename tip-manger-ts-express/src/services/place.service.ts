import mongoose from "mongoose";
import Place from "../db/models/place.model";

// add place
export const addPlaceDetails = (placeDetails: object) => {
    return Place.create(placeDetails);
};

// total Tip
export const totalTipGivenByUser = async (filter: object, projection: object) => {
    return await Place.find(filter, projection);
};

// repeated Tip Percentage
export const repeatedTipPercentageGivenByUser = async (userId: string) => {
    return await Place.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId),
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
                placeName: 1,
                tipPercenatge: { $round: ["$_id", 2] },
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
};

// most visited place by user
export const mostVisitedPlaceByUser = async (userId: string) => {
    return await Place.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId),
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
};
