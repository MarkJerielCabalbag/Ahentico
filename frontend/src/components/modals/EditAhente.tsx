import React, { useState } from "react";
import { Ahente, ModalType } from "../../types/types";
import {
  Alert,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import { CircleAlert, Edit, PenIcon } from "lucide-react";
import { hooks } from "../../hooks/hooks";
import { useParams } from "react-router-dom";

const EditAhente = ({ visible, toggleVisible }: ModalType) => {
  const { ahenteId } = useParams<{ ahenteId: string }>();
  const [ahente, setNewAhente] = useState<Ahente>({
    name: "",
    company: "",
    contact: "",
    productCoverage: "",
  });

  const [openAlert, setOpenAlert] = useState<boolean>(false);

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewAhente({ ...ahente, [e.target.name]: e.target.value });

  const { mutateAsync, isPending, isError, error } = hooks.useEditAhente(
    ahenteId as string
  );

  return (
    <Dialog open={visible} handler={toggleVisible}>
      <DialogHeader className="flex gap-2 items-center">
        <Edit />
        Edit Ahente
      </DialogHeader>
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
          <div className="flex justify-between gap-2">
            <Input
              type="text"
              name="name"
              value={ahente.name}
              placeholder="Ahente name"
              label="Name"
              onChange={handleOnchange}
            />
            <Input
              type="text"
              label="Company"
              name="company"
              value={ahente.company}
              placeholder="Ahente company"
              onChange={handleOnchange}
            />
          </div>

          <Input
            type="text"
            label="Contact"
            name="contact"
            value={ahente.contact}
            placeholder="Ahente contact"
            onChange={handleOnchange}
          />

          <Input
            type="text"
            label="Product Coverage"
            name="productCoverage"
            value={ahente.productCoverage}
            placeholder="Ahente name"
            onChange={handleOnchange}
          />
        </form>
      </DialogBody>

      <DialogFooter className="flex gap-2 items-center justify-end mt-5">
        <Button
          color="red"
          variant="outlined"
          disabled={isPending}
          onClick={() => toggleVisible(!open)}
        >
          Close
        </Button>
        <Button
          disabled={isPending}
          loading={isPending}
          color="green"
          onClick={async () => {
            try {
              await mutateAsync(ahente);
            } catch (error) {
              console.log(error);
              setNewAhente({
                name: "",
                company: "",
                contact: "",
                productCoverage: "",
              });

              setOpenAlert(!openAlert);
            }
          }}
        >
          Confirm
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default EditAhente;
