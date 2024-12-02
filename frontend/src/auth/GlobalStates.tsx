import React, { createContext, useState } from "react";

interface AuthState {
  _id: string;
  email: string;
  password: string;
}

type AuthContextType = [
  AuthState,
  React.Dispatch<React.SetStateAction<AuthState>>
];

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const GlobalStates = (children: React.ReactNode) => {
  const [auth, setAuth] = useState<AuthState>({
    _id: "",
    email: "",
    password: "",
  });
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

export default GlobalStates;
