import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Select,
  Option,
  Alert,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { ModalType, ProductCategory, ProductType } from "../../types/types";
import { CircleAlert, Plus } from "lucide-react";
import { hooks } from "../../hooks/hooks";
import { useParams } from "react-router-dom";

const AddProduct = ({ visible, toggleVisible }: ModalType) => {
  const [product, setProduct] = useState<ProductType>({
    productName: "",
    productCategory: "",
    productUnitMeasurement: "",
    productUnit: 0,
    productPricePerUnit: 0,
    productDescription: "",
  });

  const { id, ahenteId } = useParams();

  const { mutateAsync, isPending, isError, error } = hooks.useRegisterProduct(
    ahenteId as string,
    () => toggleVisible(!visible)
  );

  const { data: category } = hooks.useGetProductCategories(id as string);

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setProduct({ ...product, [e.target.name]: e.target.value });

  const [openAlert, setOpenAlert] = useState<boolean>(false);

  return (
    <Dialog open={visible} handler={toggleVisible}>
      <DialogHeader>Register Product</DialogHeader>
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
              value={product?.productName}
              placeholder="Product Name"
              label="Product Name"
              onChange={handleOnchange}
            />

            <Select
              label="Select Category"
              value={product?.productCategory}
              onChange={(value: string | undefined) =>
                setProduct({ ...product, productCategory: value || "" })
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
            value={product?.productUnitMeasurement}
            placeholder="Product Unit Measurement"
            label="Product Unit Measurement"
            onChange={handleOnchange}
          />

          <Input
            type="number"
            name="productUnit"
            value={product?.productUnit}
            placeholder="Product Unit"
            label="Product Unit"
            onChange={handleOnchange}
          />

          <Input
            type="number"
            name="productPricePerUnit"
            value={product?.productPricePerUnit}
            placeholder="Product Price Per Unit"
            label="Product Price Per Unit"
            onChange={handleOnchange}
          />

          <Input
            type="text"
            name="productDescription"
            value={product?.productDescription}
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
              await mutateAsync(product);
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

export default AddProduct;
