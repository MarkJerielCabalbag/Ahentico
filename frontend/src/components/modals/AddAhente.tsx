import { Button, Modal } from "react-daisyui";
import { ModalType } from "../../types/types";

const AddAhente = ({ open, onOpenChange }: ModalType) => {
  return (
    <>
      <Modal.Legacy open={open}>
        <Modal.Header>Add Ahente</Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Actions>
          <Button onClick={() => onOpenChange(!open)}>Close</Button>
        </Modal.Actions>
      </Modal.Legacy>
    </>
  );
};

export default AddAhente;
