import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  emailId: string;
  password: String;
  dob: String;
}

// const userSchema=new Schema<IUser>({
//     firstName: { type: String, default: "" },
//     lastName: { type: String, default: "" },
//     emailId: { type: String, required: true, unique: true },
//     password: { type: String, default: "" },
//     dob:{type:Date}
// },
//     {
//         timestamps: true
//     }
// )

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    emailId: { type: String, required: true, unique: true },
    password: { type: String,required: true, default: "" },
    dob: { type: String },
  },
  {
    timestamps: true,
  }
);

const User= mongoose.model<IUser>('User',UserSchema);
export default User;
