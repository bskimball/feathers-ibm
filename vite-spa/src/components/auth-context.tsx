import { socketClient } from "@/lib/utils";
import React, { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export interface ICredentials {
  email: string;
  password: string;
}

export interface IUser {
  email: string;
  id: number;
  googleId: string;
  facebookId: string;
  githubId: string;
  avatar: string;
}

export interface IAuthContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  login: ({ email, password }: ICredentials) => Promise<void> | null;
  logout: () => Promise<void> | null;
  register: ({ email, password }: ICredentials) => Promise<void> | null;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  setUser: () => null,
  login: () => null,
  logout: () => null,
  register: () => null,
});

const defaultState = localStorage.getItem("feathers-jwt")
  ? {
      email: "",
      id: 0,
      googleId: "",
      facebookId: "",
      githubId: "",
      avatar: "",
    }
  : null;

export function AuthProvider({ children }: { children: React.JSX.Element }) {
  const [user, setUser] = useState<IUser | null>(defaultState);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      user &&
      (location.pathname.includes("login") ||
        location.pathname.includes("register"))
    ) {
      console.log("url contains login or register");
      navigate("/", { replace: true });
    }
  });

  useEffect(() => {
    socketClient.on("login", ({ user }: { user: IUser }) => setUser(user));
    socketClient.on("logout", () => setUser(null));

    reAuthenticate();
  }, [user]);

  async function reAuthenticate() {
    try {
      await socketClient.reAuthenticate();
      console.log("authenticated");
    } catch (err) {
      console.log("reauthenticate failed user set to null");
      setUser(null);
    }
  }

  async function login({ email, password }: ICredentials) {
    const { user } = await socketClient.authenticate({
      strategy: "local",
      email,
      password,
    });
    console.log("login", { user });
    setUser(user);
    console.log("user is logged in");
  }

  async function logout() {
    await socketClient.logout();
    setUser(null);
    console.log("user is logged out");
  }

  async function register({ email, password }: ICredentials) {
    try {
      await socketClient.service("users").create({
        email,
        password,
      });
      console.log("registration sent");
    } catch (err) {
      new Error(JSON.stringify(err, null, 4));
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}
