"use server";
import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
const userCollections = dbConnect("users");

export const postUser = async (payload) => {
  console.log(payload);

  // 1. check user
  const isExist = await userCollections.findOne({ email: payload.email });

  if (isExist) {
    return {
      suscess: false,
      message: "user already existed",
    };
  }

  // create new user
  const hashPassword = await bcrypt.hash(payload.password, 10);
  console.log(hashPassword);

  const newUser = {
    ...payload,
    createdAt: new Date().toISOString(),
    role: "user",
    password: hashPassword,
  };

  console.log(newUser);

  //   3- send new user in database
  const result = await userCollections.insertOne(newUser);
  if (result.acknowledged) {
    return {
      success: true,
      message: `user created with ${result.insertedId.toString()}`,
    };
  }
};
