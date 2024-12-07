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

export type ModalType = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  alertDialogTitle?: string;
  alertDialogDescription?: React.ReactNode;
  alertDialogFooter?: React.ReactNode;
};

export type DistributorType = {
  name: string;
  company: string;
  phonenumber: string;
  email?: string;
};
