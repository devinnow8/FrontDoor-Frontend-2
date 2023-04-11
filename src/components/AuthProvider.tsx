import { useEffect, useState } from "react";
import BaseAPI from "../Api/BaseAPI";
import { CurrentPage } from "../App";
import AuthContext from "../context/AuthContext";

type UserType = {
  username: String;
  accessToken: String;
  id: String;
  refreshToken: String;
};

type AuthProviederPropsType = {
  children: React.ReactNode;
  setCurrentPage: (CurrentPage: CurrentPage) => void;
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

  const handleSignIn = (email: String, password: String) => {
    let data = JSON.stringify({
      username: email,
      password,
    });

    BaseAPI.post("auth/sign-in", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response: any) => {
        chrome.storage.sync.set({ userDetail: response.data });
        setUser({ username: email, ...response?.data });
        setCurrentPage("History");
      })
      .catch((error: any) => {
        console.log("signin error: ", error);
      });
  };

  const handleSignUp = (email: String, password: String, name: String) => {
    let data = JSON.stringify({
      username: email,
      password,
      name,
    });

    BaseAPI.post("auth/sign-up", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response: any) => {
        setUser({ username: email, name, ...response?.data });
      })
      .catch((error: any) => {
        console.log("error:", error);
      });
  };

  return (
    <AuthContext.Provider value={{ user, handleSignIn, handleSignUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
