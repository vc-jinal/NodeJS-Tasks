import Location from "../models/location.model.js";

export const getParentLocation = async (req, res) => {
    const findTopParent = await Location.find({ parentId: null });
    res.render("index", { findTopParent });
};

export const getLocationById = async (req, res) => {
    const locationId = req.params.id;
    const locationParent = await Location.find(
        { parentId: locationId },
        { locationName: 1, parentId: 1, productName: 1, childProductName: 1 }
    );
    res.render("home.ejs", {
        locationParent: locationParent,
        localtionParentId: locationId,
    });
};

// to render add location template
export const addLocationButton = async (req, res) => {
    const id = req.params.id;
    const locationIdExist = await Location.findOne({ parentId: id });
    // res.render("addLocation.ejs", { parentId:  new Types.ObjectId(id) });
    res.render("addLocation.ejs", { parentId: id });
};

// reder edit location button
export const editLocationButton = async (req, res) => {
    const id = req.params.id;
    const locationIdExist = await Location.findOne({ _id: id });
    res.render("editLocation.ejs", { id: locationIdExist._id });
    // res.render("editLocation.ejs", { id: location._id, locationName: location.locationName });
};

// to render add Product Template
export const addProductButton = async (req, res) => {
    const id = req.params.id;
    const locationIdExist = await Location.findOne({ _id: id });
    res.render("addProduct.ejs", { id: locationIdExist._id });
};

// add location details
export const addLocation = async (req, res) => {
    const parentId = req.params.id;
    const { locationName, productName, childProductName } = req.body;
    let placeIndex;
    if (parentId === "") {
        const findTopParent = await Location.find({ parentId: null });
        const givePlaceIndex = findTopParent.length > 0 ? findTopParent.length + 1 : 1;
        placeIndex = givePlaceIndex;

        const newLocation = {
            locationName: locationName,
            productName: productName,
            childProductName: childProductName,
            placeIndex: placeIndex,
        };
        const addNewLocation = await Location.create(newLocation);
        // return res.send({ statusCode: 200, message: "location added successfully", location: addNewLocation });
        res.redirect("/submit", { parentId: newLocation.parentId });
    } else {
        const findParentId = await Location.findOne({ _id: req.params.id });
        const lastChildLocation = await Location.findOne({ parentId: req.params.id }).sort({ placeIndex: -1 });
        const setIndex =
            lastChildLocation === null
                ? findParentId.placeIndex.concat(".") + 1
                : findParentId.placeIndex.concat(".", parseInt(lastChildLocation.placeIndex.split(".").pop()) + 1);
        const newLocation = {
            locationName: locationName,
            parentId: parentId,
            productName: productName,
            childProductName: childProductName,
            placeIndex: setIndex,
        };
        const addNewLocation = await Location.create(newLocation);
        // return res.send({ statusCode: 200, message: "location added successfully", location: addNewLocation });
        // res.render("/submit", { parentId: parentId });
        res.render("/", { parentId: newLocation.parentId });
    }
};

// update location name
export const updateLocation = async (req, res) => {
    const locationId = req.params.id;
    const locationName = req.body.locationName;
    const locationIdExist = await Location.findOne({ _id: locationId });
    if (!locationIdExist) {
        return res.send({ statusCode: 404, message: "Location not Found" });
    }
    const isLocationNameExist = await Location.findOne({ locationName: req.body.locationName });
    if (isLocationNameExist) {
        return res.send({ statusCode: 400, message: "Location Name is already exist" });
    }
    const updateLocationName = await Location.updateOne({ _id: locationId }, { locationName: locationName });
    // return res.send({
    //     statusCode: 200,
    //     message: "Location Updated Successfully",
    //     updateLocationName: updateLocationName,
    // });
    // res.render("/", { location: updateLocationName._id });
    res.render("home.ejs");
};

// delete
const deleteLocationAndChildren = async (locationId) => {
    const location = await Location.findOne({ _id: locationId });

    if (!location) {
        return res.send({ statusCode: 404, message: "Location Not Found" });
    }

    const children = await Location.find({ parentId: locationId });

    for (const child of children) {
        await deleteLocationAndChildren(child._id);
    }

    await Location.deleteOne({ _id: locationId });
};

export const deleteLocation = async (req, res) => {
    const locationId = req.params.id;
    await deleteLocationAndChildren(locationId);
    // return res.send({ statusCode: 200, message: "Location and their child location is deleted successfully" });
    res.render("home.ejs", { locationId: req.params.id });
};

export const getAllDetails = async (req, res) => {
    const allLocation = await Location.find({});
    res.render("home", { allLocation });
};
