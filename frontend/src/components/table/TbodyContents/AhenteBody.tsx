import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { hooks } from "../../../hooks/hooks";
import { Ahente } from "../../../types/types";

const AhenteBody = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isPending } = hooks.useGetAhentes(id as string);
  return (
    <tbody>
      {data?.map((ahente: Ahente) => (
        <tr
          key={ahente.id}
          onClick={() => navigate(`/ahente/${id}/profile/${ahente.id}`)}
        >
          <td className="p-4 border-b border-blue-gray-50">
            {isLoading || isPending ? (
              <div className="skeleton h-20 w-24"></div>
            ) : (
              ahente.name
            )}
          </td>
          <td className="p-4 border-b border-blue-gray-50">
            {isLoading || isPending ? (
              <div className="skeleton h-20 w-24"></div>
            ) : (
              ahente.company
            )}
          </td>
          <td className="p-4 border-b border-blue-gray-50">
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

export default AhenteBody;
