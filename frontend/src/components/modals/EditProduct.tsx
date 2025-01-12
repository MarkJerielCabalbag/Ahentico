import React, { useState } from "react";
import { ModalType, ProductCategory, ProductType } from "../../types/types";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Button,
  Alert,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { CircleAlert, Plus } from "lucide-react";
import { hooks } from "../../hooks/hooks";
import { useParams } from "react-router-dom";

type EditProductProps = ModalType & {
  product: ProductType;
};

const EditProduct = ({ visible, toggleVisible, product }: EditProductProps) => {
  const [editedProduct, setProduct] = useState<ProductType>({
    productName: "",
    productCategory: "",
    productUnitMeasurement: "",
    productUnit: 0,
    productPricePerUnit: 0,
    productDescription: "",
  });

  const { id, ahenteId } = useParams();

  const { mutateAsync } = hooks.useEditProduct(String(product.id), () =>
    toggleVisible(!visible)
  );

  const {
    data: category,
    isError,
    error,
    isPending,
  } = hooks.useGetProductCategories(id as string);

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setProduct({ ...editedProduct, [e.target.name]: e.target.value });

  const [openAlert, setOpenAlert] = useState<boolean>(false);
  return (
    <Dialog open={visible} handler={toggleVisible}>
      <DialogHeader>Edit Product</DialogHeader>
      <DialogBody>
        {openAlert && isError && (
          <Alert
            color="red"
            icon={<CircleAlert />}
            open={openAlert}
            action={
              <Button
                variant="text"
                color="white"
                size="sm"
                className="!absolute top-3 right-3"
                onClick={() => setOpenAlert(!openAlert)}
              >
                Close
              </Button>
            }
          >
            {error?.message}
          </Alert>
        )}

        <p className="opacity-75 italic my-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          laboriosam maiores quos quisquam totam, placeat expedita saepe ipsam
          quo nisi?
        </p>

        <form className="flex flex-col gap-5">
          <div className="flex gap-2 justify-between">
            <Input
              type="text"
              name="productName"
              value={editedProduct?.productName}
              placeholder="Product Name"
              label="Product Name"
              onChange={handleOnchange}
            />

            <Select
              label="Select Category"
              value={editedProduct?.productCategory}
              onChange={(value: string | undefined) =>
                setProduct({ ...editedProduct, productCategory: value || "" })
              }
            >
              {category?.map((category: ProductCategory) => (
                <Option key={category.id} value={category.category}>
                  {category.category}
                </Option>
              ))}
              <Button
                onClick={() => console.log("Register new category")}
                className="flex gap-2 items-center w-full"
              >
                <Plus />
                Register New Category
              </Button>
            </Select>
          </div>

          <Input
            type="text"
            name="productUnitMeasurement"
            value={editedProduct?.productUnitMeasurement}
            placeholder="Product Unit Measurement"
            label="Product Unit Measurement"
            onChange={handleOnchange}
          />

          <Input
            type="number"
            name="productUnit"
            value={editedProduct?.productUnit}
            placeholder="Product Unit"
            label="Product Unit"
            onChange={handleOnchange}
          />

          <Input
            type="number"
            name="productPricePerUnit"
            value={editedProduct?.productPricePerUnit}
            placeholder="Product Price Per Unit"
            label="Product Price Per Unit"
            onChange={handleOnchange}
          />

          <Input
            type="text"
            name="productDescription"
            value={editedProduct?.productDescription}
            placeholder="Product Description"
            label="Product Description"
            onChange={handleOnchange}
          />
        </form>
      </DialogBody>
      <DialogFooter className="flex gap-2 items-center">
        <Button
          onClick={() => toggleVisible(!visible)}
          disabled={isPending}
          variant="text"
          color="red"
        >
          Close
        </Button>
        <Button
          disabled={isPending}
          loading={isPending}
          onClick={async () => {
            try {
              await mutateAsync(editedProduct);
              setProduct({
                productName: "",
                productCategory: "",
                productUnitMeasurement: "",
                productUnit: 0,
                productPricePerUnit: 0,
                productDescription: "",
              });
            } catch (error) {
              console.log(error);
              setOpenAlert(!openAlert);
              setProduct({
                productName: "",
                productCategory: "",
                productUnitMeasurement: "",
                productUnit: 0,
                productPricePerUnit: 0,
                productDescription: "",
              });
            }
          }}
        >
          Add
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default EditProduct;
