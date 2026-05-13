import { ObjectId } from "mongoose";

declare module "next-auth" {
  interface User {
    _id?: ObjectId | string;
    username?: string;
    email?: string;
    isVerified?: boolean;
  }
  interface Session {
    user: {
      _id?: ObjectId | string;
      username: string;
      email?: string;
      isVerified?: boolean;
    };
  }
  interface jwt {
    _id?: ObjectId | string;
    username: string;
    email?: string;
    isVerified?: boolean;
  }
}
