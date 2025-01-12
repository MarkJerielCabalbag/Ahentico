import { Badge, Button, ButtonGroup, Chip } from "@material-tailwind/react";
import { createColumnHelper } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditProduct from "../components/modals/EditProduct";
import RemoveProduct from "../components/modals/RemoveProduct";
import { ProductType } from "../types/types";

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
    cell: (info) => (
      <Button variant="outlined" size="sm">
        {info.getValue()}
      </Button>
    ),
  }),

  columnHelper.accessor("productUnit", {
    id: "productUnit",
    header: "Unit",
    cell: (info) => <p>{info.getValue()}</p>,
  }),

  columnHelper.accessor("productPricePerUnit", {
    id: "productPricePerUnit",
    header: "Price",
    cell: (info) => <p>₱ {info.getValue()}</p>,
  }),

  columnHelper.accessor((row) => row, {
    id: "action",
    header: "Action",
    cell: (row) => {
      const [openEdit, setEdit] = useState<boolean>(false);
      const [openDelete, setDelete] = useState<boolean>(false);
      const handleDeleteModal = () => setDelete(!openDelete);
      const handleEditModal = () => setEdit(!openEdit);

      const product = row.getValue<ProductType>();

      return (
        <div className="flex gap-2 items-center">
          <EditProduct
            product={product}
            visible={openEdit}
            toggleVisible={setEdit}
          />

          <RemoveProduct
            visible={openDelete}
            toggleVisible={setDelete}
            product={product}
          />

          <Button
            onClick={handleEditModal}
            className="flex gap-2 items-center"
            color="blue"
          >
            <Edit />
            Edit
          </Button>
          <Button
            onClick={handleDeleteModal}
            className="flex gap-2 items-center"
            color="red"
          >
            <Trash />
            Delete
          </Button>
        </div>
      );
    },
  }),
];
