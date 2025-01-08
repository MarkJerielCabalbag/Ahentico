import { User } from "lucide-react";
import { useState } from "react";
import AddAhente from "../modals/AddAhente";
import { Button } from "@material-tailwind/react";
import DataTable from "../table/DataTable";
import { useNavigate, useParams } from "react-router-dom";
import { hooks } from "../../hooks/hooks";
import { ahenteColumn } from "../../hooks/useTable";
import { Ahente } from "../../types/types";
const ViewAhentes = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const toggleVisible = () => {
    setVisible(!visible);
  };
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isPending } = hooks.useGetAhentes(id as string);
  const ahenteId = data?.map((ahente: Ahente) => ahente.id).toString();

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

      <DataTable
        data={data}
        to={`/ahente/${id}/profile/${ahenteId}`}
        column={ahenteColumn}
      />
    </div>
  );
};

export default ViewAhentes;
