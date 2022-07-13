import { Schema, model, models } from "mongoose";
import IUser from "./IUser";

const UserSchema: Schema = new Schema({
  fullName: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default models.user || model<IUser>("user", UserSchema);
