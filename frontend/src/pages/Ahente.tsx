import ViewAhentes from "../components/ahentes/ViewAhentes";
import { useParams } from "react-router-dom";
import { ID } from "../types/types";

const Ahente = () => {
  const { id } = useParams<ID>();
  return (
    <div>
      <ViewAhentes id={id} />
    </div>
  );
};

export default Ahente;
