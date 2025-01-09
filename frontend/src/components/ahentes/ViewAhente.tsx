import { useState } from "react";
import { useParams } from "react-router-dom";
import { hooks } from "../../hooks/hooks";
import {
  Building,
  Contact,
  Edit,
  EllipsisVertical,
  Settings,
  ShoppingCart,
  Trash,
  User,
} from "lucide-react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography,
} from "@material-tailwind/react";
import EditAhente from "../modals/EditAhente";
import RemoveAhente from "../modals/RemoveAhente";
import DataTable from "../table/DataTable";
import { productColumn } from "../../hooks/useTable";
import AddProduct from "../modals/AddProduct";

const ViewAhente = () => {
  const { id, ahenteId } = useParams<{ id: string; ahenteId: string }>();

  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openRemoveModal, setOpenRemoveModal] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const toggleEditModal = () => setOpenEditModal(!openEditModal);
  const toggleRemoveModal = () => setOpenRemoveModal(!openRemoveModal);

  const { data } = hooks.useGetAhente(ahenteId as string);

  const { data: products } = hooks.useGetProducts(ahenteId as string);
  console.log(products);

  return (
    <div>
      {<EditAhente visible={openEditModal} toggleVisible={toggleEditModal} />}
      {
        <RemoveAhente
          visible={openRemoveModal}
          toggleVisible={toggleRemoveModal}
        />
      }
      {<AddProduct visible={openAddModal} toggleVisible={setOpenAddModal} />}
      <Card>
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex justify-between items-center">
            <Typography
              variant="h5"
              color="black"
              className="flex gap-2 items-center"
            >
              <User className="h4 w-4" />
              {data?.name}
            </Typography>

            <div className="flex items-center gap-2">
              <Popover>
                <PopoverHandler>
                  <Button variant="outlined">Settings</Button>
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

              <Button onClick={() => setOpenAddModal(!openAddModal)}>
                Register New Product
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 my-5">
            <div className="flex gap-2 items-center p-3 bg-black text-white rounded-md">
              <Building size={50} />
              <div>
                <p className="font-bold">{data?.company}</p>
                <h1 className="italic opacity-75 text-md">Company</h1>
              </div>
            </div>

            <div className=" flex gap-2 items-center  p-3 bg-black text-white rounded-md">
              <Contact size={50} />
              <div>
                <p className="font-bold">{data?.contact}</p>
                <h1 className="italic opacity-75 text-md">Contact</h1>
              </div>
            </div>

            <div className=" flex gap-2 items-center  p-3 bg-black text-white rounded-md">
              <ShoppingCart size={50} />
              <div>
                <p className="font-bold">{data?.productCoverage}</p>
                <h1 className="italic opacity-75 text-md">Product Coverage</h1>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <DataTable data={products} column={productColumn} />
        </CardBody>
      </Card>
    </div>
  );
};

export default ViewAhente;
