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
  productCoverage: string;
  userId?: number;
};

export type ID = {
  id: string;
};

export type ModalType = {
  header?: string;
  body?: React.ReactNode;
  visible: boolean;
  toggleVisible: (open: boolean) => void;
};

export type TableProps = {
  tableHeader: React.ReactNode;
  tableBody: React.ReactNode;
  tableFooter?: React.ReactNode;
};

export type TheadContent = {
  content: React.ReactNode;
};

export type TbodyContent = {
  content: React.ReactNode;
};
