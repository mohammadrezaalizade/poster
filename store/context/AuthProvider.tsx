import React, { useEffect } from "react";
import { useAuthStore } from "../global/authStore";
import { useRouter } from "next/router";
const AuthProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.replace("/auth");
    }
    if(user){
      router.replace("/app")
      console.log(user);
      
    }
  }, [user]);
  return <>{children}</>;
};

export default AuthProvider;
