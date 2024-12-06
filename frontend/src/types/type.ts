import React from "react";

export type UserType = {
  username?: string;
  email: string;
  password: string;
};

export type AlertType = {
  message?: React.ReactNode;
  title?: React.ReactNode;
};
