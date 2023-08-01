import { Router } from "express";
const locationRoute = Router();
import {
    addProductButton,
    addLocationButton,
    getLocationById,
    addLocation,
    updateLocation,
    deleteLocation,
    getParentLocation,
} from "../controllers/location.controller.js";

// add location
locationRoute.post("/submit", addLocation);

// to render add location template
locationRoute.get("/addLocation/:id", addLocationButton);

// add Product button
locationRoute.get("/addProduct", addProductButton);

// get parent location
locationRoute.get("/", getParentLocation);

// get location by id
locationRoute.get("/:id", getLocationById);

// update location name
locationRoute.put("/:id", updateLocation);

// delete location
locationRoute.delete("/:id", deleteLocation);

export default locationRoute;
