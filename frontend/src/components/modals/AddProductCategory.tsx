import React, { useState } from "react";
import { ModalType, ProductCategory } from "../../types/types";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import { hooks } from "../../hooks/hooks";
import { useParams } from "react-router-dom";

const AddProductCategory = ({ visible, toggleVisible }: ModalType) => {
  const [category, setCategory] = useState<ProductCategory>({
    id: 0,
    category: "",
  });

  const { id } = useParams();

  const { mutateAsync, isPending } = hooks.useAddProductCategory(
    id as string,
    () => toggleVisible(!visible)
  );
  return (
    <Dialog open={visible} handler={toggleVisible}>
      <DialogHeader>Add Category</DialogHeader>
      <DialogBody>
        <p className="opacity-75 italic my-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem, in.
        </p>
        <Input
          name="category"
          value={category.category}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCategory({ ...category, [e.target.name]: e.target.value })
          }
          label="New category"
        />
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
              await mutateAsync(category);
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Add
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default AddProductCategory;
