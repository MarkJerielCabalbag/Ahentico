import React, { useState } from "react";
import { ModalType } from "../../types/types";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { Trash } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { hooks } from "../../hooks/hooks";

const RemoveAhente = ({ visible, toggleVisible }: ModalType) => {
  const navigate = useNavigate();
  const { id, ahenteId } = useParams<{ ahenteId: string; id: string }>();

  const { data } = hooks.useGetAhente(ahenteId as string);

  const { mutateAsync, isPending } = hooks.useRemoveAhente(
    ahenteId as string,
    () => {
      navigate(`/ahente/${id}`);
      toggleVisible(!visible);
    }
  );
  return (
    <>
      <Dialog open={visible} handler={toggleVisible}>
        <DialogHeader className="flex gap-2 items-center">
          <Trash />
          Remove Ahente
        </DialogHeader>
        <DialogBody>
          <p>
            Are you sure to remove{" "}
            <span className="text-red-400 font-bold">{data?.name}</span> as your
            distributor? This action can not be undone, meaning it will be
            deleted permanently
          </p>
        </DialogBody>
        <DialogFooter className="flex gap-2 items-center">
          <Button
            variant="text"
            color="red"
            onClick={() => toggleVisible(!visible)}
          >
            Close
          </Button>
          <Button
            color="green"
            loading={isPending}
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
    </>
  );
};

export default RemoveAhente;
