import { atom } from "recoil";

export const userToken = atom({
  key: "userInfo",
  default: null,
});
