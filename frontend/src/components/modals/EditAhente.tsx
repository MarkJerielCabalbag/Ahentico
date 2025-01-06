import React from "react";
import { ModalType } from "../../types/types";
import { Button, Modal } from "react-daisyui";

const EditAhente = ({ visible, toggleVisible }: ModalType) => {
  return (
    <Modal.Legacy open={visible}>
      <Modal.Header>Edit Ahente</Modal.Header>
      <Modal.Body></Modal.Body>

      <Modal.Actions className="flex gap-2 justify-end">
        <Button onClick={() => toggleVisible(!visible)}>Close</Button>
        <Button>Edit</Button>
      </Modal.Actions>
    </Modal.Legacy>
  );
};

export default EditAhente;
