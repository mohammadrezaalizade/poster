import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import User from "../../../db/models/user";
import connectMongo from "../../../db/utils/mongodb";
import jwt from "jsonwebtoken"

const KEY = process.env.JWT_KEY

const router = createRouter<NextApiRequest, NextApiResponse>();



router.get((req, res) => {
  res.json({
    users: ["Mohammadreza"],
  });
});

router.post(async (req, res) => {
  try {
    console.log("**____________________________**");

    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");

    console.log("CREATING DOCUMENT");

    const newUser = await User.create({
      username: "momrez",
      email: "poster@momrez.com",
      password: "12345678",
      name: "Mohammadreza",
    });
    console.log("CREATED DOCUMENT");

    res.status(200).json(newUser);
    console.log("**____________________________**");
  } catch (error) {
    console.log("**____________________________**");
    console.log(error);
    res.json({ error });
    console.log("**____________________________**");
  }
});

router.all((req, res) => {
  res.status(405).json({
    error: "Method not allowed",
  });
});

export default router.handler({
  onError(err, req, res) {
    res.status(500).json({
      error: (err as Error).message,
    });
  },
});
