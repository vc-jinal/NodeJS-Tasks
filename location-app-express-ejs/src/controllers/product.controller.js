import Location from "../models/location.model.js";

// add product to location and update parent locations' childProductName
export const addProduct = async (req, res) => {
    const locationId = req.params.id;
    const productName = req.body.productName;
    const location = await Location.findOne({ _id: locationId });
    if (!location) {
        return res.send({ statusCode: 404, message: "Location not Found" });
    }
    const updateParentChildProduct = async (parentId) => {
        if (!parentId) {
            return;
        }

        const parentLocation = await Location.findOne({ _id: parentId });
        if (!parentLocation) {
            return;
        }

        const updatedChildProductName = parentLocation.childProductName.toObject();
        updatedChildProductName.push(productName);

        await Location.updateOne({ _id: parentId }, { childProductName: updatedChildProductName });

        await updateParentChildProduct(parentLocation.parentId);
    };

    const updatedProductName = location.productName.toObject();
    updatedProductName.push(productName);

    const addProductOfLocation = await Location.updateOne({ _id: locationId }, { productName: updatedProductName });
    console.log("addProductOfLocation", addProductOfLocation);

    const updateChildProduct = await updateParentChildProduct(location.parentId);
    console.log("updateChildProduct", updateChildProduct);
    return res.send({ statusCode: 200, message: "Product added successfully" });
};
