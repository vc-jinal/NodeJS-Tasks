import { Router } from "express";
const locationRoute = Router();
import {
    getLocationById,
    addLocation,
    updateLocation,
    deleteLocation,
    getParentLocation,
} from "../controllers/location.controller.js";

// add location
locationRoute.post("/", addLocation);

// get parent location
locationRoute.get("/", getParentLocation);

// get location by id
locationRoute.get("/:id", getLocationById);

// update location name
locationRoute.put("/:id", updateLocation);

// delete location
locationRoute.delete("/:id", deleteLocation);

export default locationRoute;
