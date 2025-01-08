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
