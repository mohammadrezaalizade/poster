import "../styles/globals.css";
import type { AppProps } from "next/app";
import Notification from "../components/UI/notification/Notification";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Notification />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
