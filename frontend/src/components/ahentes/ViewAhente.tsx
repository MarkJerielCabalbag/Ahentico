import { useState } from "react";
import { useParams } from "react-router-dom";
import { hooks } from "../../hooks/hooks";
import { Building, Contact, ShoppingCart } from "lucide-react";
import { Button } from "@material-tailwind/react";
import EditAhente from "../modals/EditAhente";
import RemoveAhente from "../modals/RemoveAhente";

const ViewAhente = () => {
  const { id, ahenteId } = useParams<{ id: string; ahenteId: string }>();

  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  const toggleEditModal = () => setOpenEditModal(!openEditModal);

  const { data } = hooks.useGetAhente(ahenteId as string);

  return (
    <div>
      <div>
        <h1 className="text-3xl font-extrabold ">{data?.name}</h1>
        <div className="grid grid-cols-3 my-5 gap-5 ">
          <div className=" flex gap-2 items-center p-5 rounded-sm">
            <Building size={50} />
            <div>
              <p className="font-bold">{data?.company}</p>
              <h1 className="italic opacity-75 text-md">Company</h1>
            </div>
          </div>

          <div className=" flex gap-2 items-center p-5 rounded-sm">
            <Contact size={50} />
            <div>
              <p className="font-bold">{data?.contact}</p>
              <h1 className="italic opacity-75 text-md">Contact</h1>
            </div>
          </div>

          <div className=" flex gap-2 items-center p-5 rounded-sm">
            <ShoppingCart size={50} />
            <div>
              <p className="font-bold">{data?.productCoverage}</p>
              <h1 className="italic opacity-75 text-md">Product Coverage</h1>
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <Button color="blue" onClick={toggleEditModal}>
            Edit Ahente
          </Button>
          <Button className="bg-red-500 text-white">Delete Ahente</Button>
        </div>

        <div>
          <EditAhente visible={openEditModal} toggleVisible={toggleEditModal} />
        </div>
      </div>
    </div>
  );
};

export default ViewAhente;
