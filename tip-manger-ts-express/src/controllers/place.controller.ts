import { Request, Response } from "express";
import { AuthenticationRequest } from "../utils/jwt";
import { ResponseHandler } from "../common/types";
import { getUserDetails } from "../services/user.service";
import {
    addPlaceDetails,
    mostVisitedPlaceByUser,
    repeatedTipPercentageGivenByUser,
    totalTipGivenByUser,
} from "../services/place.service";

// add Place Details
export const addPlace = async (req: AuthenticationRequest & Request, res: Response) => {
    try {
        const { placeName, billAmount, tipAmount } = req.body;

        const userExist = await getUserDetails({ _id: req.id });
        if (!userExist) {
            return ResponseHandler(res, 404, "User Not Found");
        }

        const newPlaceDetails = {
            userId: req.id,
            placeName: placeName,
            billAmount: billAmount,
            tipAmount: tipAmount,
        };

        const addplaceDetails = await addPlaceDetails(newPlaceDetails);
        return ResponseHandler(res, 200, "Place Added Successfully", { addplaceDetails });
    } catch (error) {
        return ResponseHandler(res, 500, "Internal Server Error", [], [error]);
    }
};

// total tip given by user
export const totalTipByUser = async (req: AuthenticationRequest & Request, res: Response) => {
    try {
        const placeName = req.params.placeName;
        const totalTip = await totalTipGivenByUser(
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
        const pipeline = await repeatedTipPercentageGivenByUser(req.id as string);
        return ResponseHandler(res, 200, "Repeated Tip Percenatge", { pipeline });
    } catch (error) {
        return ResponseHandler(res, 500, "Internal Server Error", [], [error]);
    }
};

// most visited place by user
export const mostVisitedPlace = async (req: AuthenticationRequest & Request, res: Response) => {
    try {
        const pipeline = await mostVisitedPlaceByUser(req.id as string);
        return ResponseHandler(res, 200, "Repeated visited place", { pipeline });
    } catch (error) {
        return ResponseHandler(res, 500, "Internal Server Error", [], [error]);
    }
};
