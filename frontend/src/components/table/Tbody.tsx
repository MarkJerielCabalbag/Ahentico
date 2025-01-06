import { useNavigate, useParams } from "react-router-dom";
import { hooks } from "../../hooks/hooks";
import { Ahente, ID } from "../../types/types";
import { Table } from "react-daisyui";

const Tbody = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, isPending } = hooks.useGetAhentes(id);

  return (
    <Table.Body>
      {data?.map((ahente: Ahente) => (
        <Table.Row
          key={ahente.id}
          onClick={() => navigate(`/ahente/${id}/profile/${ahente.id}`)}
        >
          <span></span>
          <span>
            {isLoading || isPending ? (
              <div className="skeleton h-20 w-24"></div>
            ) : (
              ahente.name
            )}
          </span>
          <span>
            {isLoading || isPending ? (
              <div className="skeleton h-20 w-24"></div>
            ) : (
              ahente.company
            )}
          </span>
          <span>
            {isLoading || isPending ? (
              <div className="skeleton h-20 w-24"></div>
            ) : (
              ahente.contact
            )}
          </span>
        </Table.Row>
      ))}
    </Table.Body>
  );
};

export default Tbody;
