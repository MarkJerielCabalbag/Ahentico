import { Alert, Button, Input, Loading, Modal } from "@material-tailwind/react";
import { Ahente, ModalType } from "../../types/types";
import { useState } from "react";
import { hooks } from "../../hooks/hooks";
import { useParams } from "react-router-dom";

const AddAhente = ({ visible, toggleVisible }: ModalType) => {
  const { id } = useParams();
  const [ahente, setNewAhente] = useState<Ahente>({
    name: "",
    company: "",
    contact: "",
    productCoverage: "",
  });

  const { mutateAsync, isPending, isError, error } = hooks.useRegisterAhente(
    id,
    () => toggleVisible(!open)
  );

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewAhente({ ...ahente, [e.target.name]: e.target.value });
  return (
    <Modal.Legacy open={visible} className="bg-slate-800 p-5 rounded-md w-2/6">
      <Modal.Header>Register Ahente</Modal.Header>
      <Modal.Body>
        <p className="my-2 opacity-75 italic">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam
          dignissimos nam nemo earum tempora alias?
        </p>

        {isError ? (
          <>
            <Alert
              className="flex items-center gap-2 bg-error p-4 rounded-md text-white"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            >
              <span>{error.message}</span>
            </Alert>
          </>
        ) : null}

        <form className="flex flex-col gap-5">
          <div className="flex w-full component-preview items-center justify-center gap- font-sans">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <Input
                type="text"
                className={`input input-primary ${
                  isError ? "input-error" : "input"
                }`}
                name="name"
                value={ahente.name}
                placeholder="Ahente name"
                onChange={handleOnchange}
              />
            </div>
          </div>

          <div className="flex w-full component-preview items-center justify-center gap-2 font-sans">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Company</span>
              </label>
              <Input
                type="text"
                className={`input input-primary ${
                  isError ? "input-error" : "input"
                }`}
                name="company"
                value={ahente.company}
                placeholder="Ahente company"
                onChange={handleOnchange}
              />
            </div>
          </div>

          <div className="flex w-full component-preview items-center justify-center gap-2 font-sans">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Contact</span>
              </label>
              <Input
                type="text"
                className={`input input-primary ${
                  isError ? "input-error" : "input"
                }`}
                name="contact"
                value={ahente.contact}
                placeholder="Ahente contact"
                onChange={handleOnchange}
              />
            </div>
          </div>

          <div className="flex w-full component-preview items-center justify-center gap-2 font-sans">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Product Coverage</span>
              </label>
              <Input
                type="text"
                className={`input input-primary ${
                  isError ? "input-error" : "input"
                }`}
                name="productCoverage"
                value={ahente.productCoverage}
                placeholder="Ahente name"
                onChange={handleOnchange}
              />
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Actions className="flex gap-2 items-center justify-end mt-5">
        <Button onClick={() => toggleVisible(!open)}>Close</Button>
        <Button
          className="btn btn-primary"
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
            }
          }}
        >
          {isPending ? <Loading variant="bars" /> : "Submit"}
        </Button>
      </Modal.Actions>
    </Modal.Legacy>
  );
};

export default AddAhente;
