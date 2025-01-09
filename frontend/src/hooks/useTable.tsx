import { createColumnHelper } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

const columnHelper = createColumnHelper();

export const ahenteColumn = [
  columnHelper.accessor("name", {
    id: "name",
    header: "Name",
    cell: (info) => <p>{info.getValue()}</p>,
  }),

  columnHelper.accessor("company", {
    id: "company",
    header: "Company",
    cell: (info) => <p>{info.getValue()}</p>,
  }),

  columnHelper.accessor("contact", {
    id: "contact",
    header: "Contact",
    cell: (info) => <p>{info.getValue()}</p>,
  }),

  columnHelper.accessor("productCoverage", {
    id: "productCoverage",
    header: "Product Coverage",
    cell: (info) => <p>{info.getValue()}</p>,
  }),
];

export const productColumn = [
  columnHelper.accessor("productName", {
    id: "productName",
    header: "Product Name",
    cell: (info) => <p>{info.getValue()}</p>,
  }),

  columnHelper.accessor("productCategory", {
    id: "productCategory",
    header: "Product Category",
    cell: (info) => <p>{info.getValue()}</p>,
  }),

  columnHelper.accessor("productUnitMeasurement", {
    id: "productUnitMeasurement",
    header: "Unit Measurement",
    cell: (info) => <p>{info.getValue()}</p>,
  }),

  columnHelper.accessor("productUnit", {
    id: "productUnit",
    header: "Unit",
    cell: (info) => <p>{info.getValue()}</p>,
  }),

  columnHelper.accessor("productPricePerUnit", {
    id: "productPricePerUnit",
    header: "Price",
    cell: (info) => <p>{info.getValue()}</p>,
  }),
];
