import React from "react";
import { ModalType } from "../../types/types";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { PenIcon } from "lucide-react";

const EditAhente = ({ visible, toggleVisible }: ModalType) => {
  return (
    <Dialog open={visible} handler={toggleVisible}>
      <DialogHeader>Edit Ahente</DialogHeader>
      <DialogBody>
        <>{visible}</>
      </DialogBody>

      <DialogFooter className="flex gap-2 justify-end">
        <Button
          variant="text"
          color="red"
          onClick={() => toggleVisible(!visible)}
        >
          Close
        </Button>
        <Button
          className="flex flex-row-reverse gap-2 items-center"
          color="green"
        >
          <PenIcon size={15} />
          Edit
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default EditAhente;
