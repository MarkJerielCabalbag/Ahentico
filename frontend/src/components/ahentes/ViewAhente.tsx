import { useState } from "react";
import { useParams } from "react-router-dom";
import { hooks } from "../../hooks/hooks";
import {
  Building,
  Contact,
  Edit,
  EllipsisVertical,
  ShoppingCart,
  Trash,
} from "lucide-react";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import EditAhente from "../modals/EditAhente";
import RemoveAhente from "../modals/RemoveAhente";

const ViewAhente = () => {
  const { id, ahenteId } = useParams<{ id: string; ahenteId: string }>();

  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openRemoveModal, setOpenRemoveModal] = useState<boolean>(false);

  const toggleEditModal = () => setOpenEditModal(!openEditModal);
  const toggleRemoveModal = () => setOpenRemoveModal(!openRemoveModal);

  const { data } = hooks.useGetAhente(ahenteId as string);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold ">{data?.name}</h1>

        <Popover>
          <PopoverHandler>
            <Button variant="text">
              <EllipsisVertical />
            </Button>
          </PopoverHandler>
          <PopoverContent className="flex flex-col gap-2">
            <Button
              color="blue"
              className="flex gap-2 items-center"
              variant="text"
              onClick={toggleEditModal}
            >
              <Edit />
              Edit Ahente
            </Button>
            <Button
              className="flex gap-2 items-center"
              color="red"
              variant="text"
              onClick={toggleRemoveModal}
            >
              <Trash />
              Delete Ahente
            </Button>
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid grid-cols-3 justify-start my-5 gap-5 ">
        <div className=" flex gap-2 items-center ">
          <Building size={50} />
          <div>
            <p className="font-bold">{data?.company}</p>
            <h1 className="italic opacity-75 text-md">Company</h1>
          </div>
        </div>

        <div className=" flex gap-2 items-center ">
          <Contact size={50} />
          <div>
            <p className="font-bold">{data?.contact}</p>
            <h1 className="italic opacity-75 text-md">Contact</h1>
          </div>
        </div>

        <div className=" flex gap-2 items-center ">
          <ShoppingCart size={50} />
          <div>
            <p className="font-bold">{data?.productCoverage}</p>
            <h1 className="italic opacity-75 text-md">Product Coverage</h1>
          </div>
        </div>
      </div>

      <div>
        <EditAhente visible={openEditModal} toggleVisible={toggleEditModal} />
        <RemoveAhente
          visible={openRemoveModal}
          toggleVisible={toggleRemoveModal}
        />
      </div>
    </div>
  );
};

export default ViewAhente;
