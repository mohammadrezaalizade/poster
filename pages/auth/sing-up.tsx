import type { NextPage } from "next";
import SingUp from "../../components/auth/SingUp";
import { GetServerSideProps } from "next";
import jwt from "jsonwebtoken";

const SingUpPage: NextPage = () => {
  return <SingUp />;
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const tokenFromCookie = ctx.req.cookies.token || "";

  if (tokenFromCookie) {
    return {
      props: {},
      redirect: {
        destination: "/app",
      },
    };
  }
  return {
    props: {},
  };
};

export default SingUpPage;
