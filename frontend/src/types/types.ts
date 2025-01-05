import React from "react";

export type User = {
  username?: string;
  email: string;
  password: string;
};

export type Ahente = {
  id?: number;
  name: string;
  company: string;
  contact: string;
  productivityCoverage: string;
  userId?: number;
};

export type ID = {
  id: string;
};

export type ModalType = {
  header?: string;
  body?: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
