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
    deleteLocationButton,
    addParentbutton,
    addParentLocation,
} from "../controllers/location.controller.js";

// add parentLOcation
locationRoute.post("/parentLocation", addParentLocation);

// add location
locationRoute.post("/:id", addLocation);

// parentLOcation button
locationRoute.get("/parentLocation", addParentbutton);

// update location name
locationRoute.post("/edit/:id", updateLocation);

// get location by id
locationRoute.get("/:id", getLocationById);

// to render edit location template
locationRoute.get("/editLocation/:id", editLocationButton);

// to render add location template
locationRoute.get("/addLocation/:id", addLocationButton);

// to render delete location template
locationRoute.get("/deleteLocation/:id", deleteLocationButton);

// add Product button
locationRoute.get("/addProduct/:id", addProductButton);

// delete location
locationRoute.post("/delete/:id", deleteLocation);

// get parent location
locationRoute.get("/", getParentLocation);

export default locationRoute;
