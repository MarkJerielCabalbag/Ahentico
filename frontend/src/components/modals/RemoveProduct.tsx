import React from "react";
import { ModalType, ProductType } from "../../types/types";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Button,
  Alert,
  Typography,
} from "@material-tailwind/react";
import { Info } from "lucide-react";
import { hooks } from "../../hooks/hooks";

type RemoveProductProps = ModalType & {
  product: ProductType;
};

const RemoveProduct = ({
  visible,
  toggleVisible,
  product,
}: RemoveProductProps) => {
  const { mutateAsync } = hooks.useRemoveProduct(String(product.id), () =>
    toggleVisible(!visible)
  );

  return (
    <Dialog open={visible} handler={toggleVisible}>
      <DialogHeader>Remove Product</DialogHeader>
      <DialogBody>
        <Alert icon={<Info />}>
          This action cannot be undone once confirmed
        </Alert>
        <Typography className="my-2">
          Are you sure to remove the product:
          <b className="text-red-500 font-bold italic">
            {product.productName}
          </b>{" "}
        </Typography>
      </DialogBody>
      <DialogFooter className="flex gap-2 items-center">
        <Button
          onClick={() => toggleVisible(!visible)}
          color="red"
          variant="text"
        >
          Close
        </Button>
        <Button
          onClick={async () => {
            try {
              await mutateAsync();
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Confirm
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default RemoveProduct;
