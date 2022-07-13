import { Document } from "mongoose";


export default interface IUser extends Document{
  username: string;
  fullName: string;
  email: string;
  password: string;
  createdAt?:Date
}
