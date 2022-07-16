import { toast } from "react-toastify";

type messageType = "success" | "info" | "warning" | "error";

export const tostify = (message: string, type: messageType) => {
  toast(message, { type: type, position: "top-right", icon: true, });
};
