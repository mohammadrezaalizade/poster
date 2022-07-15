import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import User from "../../../db/models/user";
import connectMongo from "../../../db/utils/mongodb";
import jwt from "jsonwebtoken";

const KEY = process.env.NEXT_PUBLIC_JWT_KEY as string;

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req, res) => {
  try {
    const { username, password, keepmeSingIn } = req.body;
    await connectMongo();

    const userExists = await User.exists({ username: username });
    if (!userExists) throw new Error("Username is't correct");

    const user = await User.findOne({ username: username });

    if (password !== user.password) throw new Error("Password is't correct");

    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      createdAt: user.createdAt,
    };

    const createUserToken = jwt.sign(payload, KEY, { expiresIn: "7d" });

    if (password === user.password) {
      if (keepmeSingIn) {
        res.setHeader(
          "Set-Cookie",
          `token=${createUserToken}; path='/'; Max-Age=604800 ; httpOnly; secure; SameSite=Strict`
        );
        res.status(200).json({
          token: createUserToken,
          userInfo: payload,
        });
      } else {
        res.setHeader("Set-Cookie", "token=someValue; Max-Age=0");
        res.status(200).json({ userInfo: payload, token: createUserToken });
      }
    }
  } catch (error: any) {
    console.log(error);
    res.status(401).json({ error: error.message, status: 401 });
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
