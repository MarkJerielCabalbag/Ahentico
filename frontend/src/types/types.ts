import { AccessorKeyColumnDef, ColumnDef } from "@tanstack/react-table";
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

export type PaginationProps = {
  pageSize?: number;
  pageIndex?: number;
};

export type TableProps<T> = {
  tableHeader?: React.ReactNode;
  tableBody?: React.ReactNode;
  tableFooter?: React.ReactNode;
  to?: string;
  data?: T[];
  column?: AccessorKeyColumnDef<T>[];

  setPagination: (prev: PaginationProps) => void;
  rowLength: number;
};

export type ProductType = {
  id?: number;
  productName: string;
  productCategory: string;
  productUnitMeasurement: string;
  productUnit: number;
  productPricePerUnit: number;
  productDescription: string;
  ahenteId?: number;
};

export type ProductCategory = {
  id?: number;
  category: string;
};
