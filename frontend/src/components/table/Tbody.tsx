import { hooks } from "../../hooks/hooks";
import { Ahente, ID } from "../../types/types";

const Tbody = ({ id }: ID) => {
  const { data, isLoading, isPending } = hooks.useGetAhentes(id);

  return (
    <tbody>
      {data?.map((ahente: Ahente) => (
        <tr>
          <td></td>
          <td>
            {isLoading || isPending ? (
              <div className="skeleton h-20 w-24"></div>
            ) : (
              ahente.name
            )}
          </td>
          <td>
            {isLoading || isPending ? (
              <div className="skeleton h-20 w-24"></div>
            ) : (
              ahente.company
            )}
          </td>
          <td>
            {isLoading || isPending ? (
              <div className="skeleton h-20 w-24"></div>
            ) : (
              ahente.contact
            )}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default Tbody;
