import { useEffect, useState } from "react";
import BaseAPI from "../Api/BaseAPI";
import { Page } from "../App";
import AuthContext from "../context/AuthContext";

type UserType = {
  username: String;
  accessToken: String;
  id: String;
  refreshToken: String;
};

type AuthProviederPropsType = {
  children: React.ReactNode;
  setCurrentPage: (page: Page) => void;
};

function AuthProvider({ children, setCurrentPage }: AuthProviederPropsType) {
  const [user, setUser] = useState<UserType>({
    username: "",
    accessToken: "",
    id: "",
    refreshToken: "",
  });

  useEffect(() => {
    chrome.storage.sync.get("userDetail", async (data) => {
      console.log("data.userDetail: ", data);
      setUser(data.userDetail);
      if (!!data.userDetail.id) {
        setCurrentPage("History");
      }
    });
  }, []);

  const handleSignIn = async (email: String, password: String) => {
    try {
      let data = JSON.stringify({
        username: email,
        password,
      });

      let response = await BaseAPI.post("auth/sign-in", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("signin: ", response.data.data);
      chrome.storage.sync.set({ userDetail: response.data.data });
      setUser({ username: email, ...response?.data?.data });
      setCurrentPage("History");
    } catch (error) {
      console.log("signin error: ", error);
    }
  };

  const handleSignUp = async (
    email: String,
    password: String,
    name: String
  ) => {
    try {
      let data = JSON.stringify({
        username: email,
        password,
        name,
      });

      let response = await BaseAPI.post("auth/sign-up", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUser({ username: email, name, ...response?.data?.data });
    } catch (error) {}
  };

  return (
    <AuthContext.Provider value={{ user, handleSignIn, handleSignUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
