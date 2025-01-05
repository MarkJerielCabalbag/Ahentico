import { Plus } from "lucide-react";
import Thead from "../table/Thead";
import Tbody from "../table/Tbody";
import { ID } from "../../types/types";
import { useState } from "react";
import AddAhente from "../modals/AddAhente";
import { Button } from "react-daisyui";
const ViewAhentes = ({ id }: ID) => {
  const [open, onOpenChange] = useState<boolean>();

  const toggleModal = (open: boolean) => onOpenChange(!open);

  return (
    <div>
      <h1 className="text-3xl font-bold">Ahente</h1>
      <p className="my-3 italic opacity-75">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
        quibusdam eos facilis alias autem ipsam repellat itaque. Nesciunt quidem
        aliquam, placeat, est necessitatibus fuga porro, labore voluptates
        voluptas consequatur modi!
      </p>
      <Button className="btn btn-primary" onClick={() => onOpenChange(!open)}>
        <Plus />
        Add Ahente
      </Button>
      {open && <AddAhente open={open} onOpenChange={toggleModal} />}
      <table className="table">
        <Thead />
        <Tbody id={id} />
      </table>
    </div>
  );
};

export default ViewAhentes;
