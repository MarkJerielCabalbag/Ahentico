import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import React from "react";
import { ModalType } from "../../types/types";
import { hooks } from "../../hooks/hooks";

type RemoveProductCategoryProps = ModalType & {
  categoryId: number;
};

const RemoveProductCategory = ({
  visible,
  toggleVisible,
  categoryId,
}: RemoveProductCategoryProps) => {
  const { mutateAsync, isPending } = hooks.useRemoveProductCategory(
    categoryId,
    () => toggleVisible(!visible)
  );
  return (
    <Dialog size="sm" open={visible} handler={toggleVisible}>
      <DialogHeader>Remove Product category</DialogHeader>
      <DialogBody>Are you sure to remove this category? </DialogBody>
      <DialogFooter className="flex gap-2 items-center">
        <Button
          variant="text"
          color="red"
          disabled={isPending}
          onClick={() => toggleVisible(!visible)}
        >
          Close
        </Button>
        <Button
          color="green"
          loading={isPending}
          disabled={isPending}
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

export default RemoveProductCategory;
