import { Plus } from "lucide-react";
import Thead from "../table/Thead";
import Tbody from "../table/Tbody";
import { ID } from "../../types/types";
import { useCallback, useRef, useState } from "react";
import AddAhente from "../modals/AddAhente";
import { Button, Modal, Table } from "react-daisyui";
const ViewAhentes = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Ahente</h1>
      <p className="my-3 italic opacity-75">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
        quibusdam eos facilis alias autem ipsam repellat itaque. Nesciunt quidem
        aliquam, placeat, est necessitatibus fuga porro, labore voluptates
        voluptas consequatur modi!
      </p>

      <Button className="btn btn-primary" onClick={toggleVisible}>
        <Plus />
        Register New Ahente
      </Button>
      {visible && <AddAhente visible={visible} toggleVisible={toggleVisible} />}

      <Table className="table">
        <Thead />
        <Tbody />
      </Table>
    </div>
  );
};

export default ViewAhentes;
