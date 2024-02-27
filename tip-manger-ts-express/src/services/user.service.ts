import User, { IUser } from "../db/models/user.model";

// get user details
export const getUserDetails = async (condition: object) => {
    return await User.findOne(condition);
};

// create User
export const createUser = async (userDetails: object) => {
    return await User.create(userDetails);
};

// get Details of all details
export const getAllUserDetails = async () => {
    return await User.find();
};

// update user Details
export const updateUserDetails = async (filter: object, updateDetail: object) => {
    return await User.updateOne(filter, updateDetail);
};

// delete User details
export const deleteUserDetails = async (condition: object) => {
    return await User.deleteOne(condition);
};
