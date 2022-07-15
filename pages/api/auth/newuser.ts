import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import User from "../../../db/models/user";
import connectMongo from "../../../db/utils/mongodb";
import jwt from "jsonwebtoken";

const KEY = process.env.NEXT_PUBLIC_JWT_KEY as string;

const router = createRouter<NextApiRequest, NextApiResponse>();
router.post(async (req, res) => {
  try {
    const { username, password, email, fullName } = req.body;
    await connectMongo();

    const usernameStatus = await User.exists({ username: username });
    if (usernameStatus) throw new Error("This username is not available");
    const newUser = await User.create({
      fullName,
      username,
      email,
      password,
    });
    const findUser = await User.findById(newUser);
    const payload = {
      email: findUser.email,
      fullName: findUser.fullName,
      username: findUser.username,
      id: findUser._id,
    };

    const createUserToken = jwt.sign(payload, KEY, { expiresIn: "7d" });
    res.setHeader(
      "Set-Cookie",
      `token=${createUserToken}; path='/'; Max-Age=604800 ; httpOnly; secure; SameSite=Strict`
    );
    ``;
    res.statusCode = 201;

    res.json({
      token: createUserToken,
      userCreated: true,
    });
  } catch (error) {
    res.json({ error: (error as Error).message });
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
