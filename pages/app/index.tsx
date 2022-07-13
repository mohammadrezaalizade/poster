import type { NextPage } from "next";
import AuthProvider from "../../store/context/AuthProvider";
const AppPage: NextPage = () => {
  return (
    <AuthProvider>
      <div></div>
    </AuthProvider>
  );
};

export default AppPage;
