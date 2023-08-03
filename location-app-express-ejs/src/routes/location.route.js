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
    editLocationButton,
} from "../controllers/location.controller.js";

// update location name
locationRoute.put("/edit/:id", updateLocation);

// get location by id
locationRoute.get("/:id", getLocationById);

// to render edit location template
locationRoute.get("/editLocation/:id", editLocationButton);

// to render add location template
locationRoute.get("/addLocation/:id", addLocationButton);

// add Product button
locationRoute.get("/addProduct/:id", addProductButton);

// delete location
locationRoute.delete("/delete/:id", deleteLocation);

// add location
locationRoute.post("/:id", addLocation);

// get parent location
locationRoute.get("/", getParentLocation);

export default locationRoute;
