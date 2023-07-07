import { Router } from "express";
import { verifyToken } from "../utils/jwt";
import { addPlace, totalTipByUser, repeatedTipPercentage, mostVisitedPlace } from "../controllers/place.controller";
const placeRouter = Router();

//create place
placeRouter.post("/", verifyToken, addPlace);

// most visited place
placeRouter.get("/visitPlaces", verifyToken, mostVisitedPlace);

// repeated Tip percentage of user
placeRouter.get("/tipPercentage", verifyToken, repeatedTipPercentage);

// get total tip given by user
placeRouter.get("/:placeName", verifyToken, totalTipByUser);

export default placeRouter;
