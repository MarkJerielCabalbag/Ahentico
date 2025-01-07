import { User } from "lucide-react";
import Thead from "../table/Thead";
import Tbody from "../table/Tbody";
import { useState } from "react";
import AddAhente from "../modals/AddAhente";
import { Button } from "@material-tailwind/react";
import { Table } from "../Table";
import AhenteHeader from "../table/TheadContents/AhenteHeader";
import AhenteBody from "../table/TbodyContents/AhenteBody";
const ViewAhentes = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Ahente</h1>
        <Button className="flex gap-2 items-center" onClick={toggleVisible}>
          <User />
          Register Ahente
        </Button>
      </div>
      <p className="my-3 italic opacity-75">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
        quibusdam eos facilis alias autem ipsam repellat itaque. Nesciunt quidem
        aliquam, placeat, est necessitatibus fuga porro, labore voluptates
        voluptas consequatur modi!
      </p>

      {visible && <AddAhente visible={visible} toggleVisible={toggleVisible} />}

      <Table
        tableHeader={<Thead content={<AhenteHeader />} />}
        tableBody={<Tbody content={<AhenteBody />} />}
      />
    </div>
  );
};

export default ViewAhentes;
