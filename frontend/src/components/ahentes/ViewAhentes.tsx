import { Search, UserPlusIcon } from "lucide-react";
import { useState } from "react";
import AddAhente from "../modals/AddAhente";
import { Button, Input, Typography } from "@material-tailwind/react";
import DataTable from "../table/DataTable";
import { useNavigate, useParams } from "react-router-dom";
import { hooks } from "../../hooks/hooks";
import { ahenteColumn } from "../../hooks/useTable";
import { Ahente } from "../../types/types";
const ViewAhentes = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const toggleVisible = () => {
    setVisible(!visible);
  };

  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isPending } = hooks.useGetAhentes(id as string);

  return (
    <div>
      {visible && <AddAhente visible={visible} toggleVisible={toggleVisible} />}

      <DataTable
        tableHeader={
          <>
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Ahentes
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  See information about all ahentes
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button
                  className="flex items-center gap-3"
                  size="sm"
                  onClick={() => toggleVisible()}
                >
                  <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Register
                  Ahente
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 md:flex-row">
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  icon={<Search strokeWidth={2} className="h-4 w-4" />}
                />
              </div>
            </div>
          </>
        }
        data={data}
        onRowClick={(row: any) => navigate(`/ahente/${id}/profile/${row.id}`)}
        column={ahenteColumn}
      />
    </div>
  );
};

export default ViewAhentes;
