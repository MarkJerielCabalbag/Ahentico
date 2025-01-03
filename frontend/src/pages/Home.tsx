import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { hooks } from "../hooks/hooks";
import { LogOut } from "lucide-react";

const Home = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isPending } = hooks.useGetUserInfo(id);

  const navigate = useNavigate();
  return (
    <div className="flex h-screen">
      <div className="p-5 flex flex-col justify-between h-screen border-r-2 border-primary w-1/5">
        <div>
          <div>
            <h1 className="text-primary font-bold text-2xl">Ahentico</h1>
          </div>
          <div>
            <Link to={`/home/${id}`}>Home</Link>
            <Link to={`/ahente/${id}`}>Ahente</Link>
          </div>
        </div>
        <div>
          <div className="flex gap-3 items-center">
            <div className="bg-purple-500 rounded-full h-16 w-16"></div>
            <div className="flex flex-col">
              <h1 className="text-primary italic text-2xl">
                {isPending || isLoading ? (
                  <span className="skeleton h-32 w-32"></span>
                ) : (
                  data.username
                )}
              </h1>
              <p className="opacity-75 italic">
                {isLoading || isPending ? (
                  <span className="skeleton h-32 w-32"></span>
                ) : (
                  data.email
                )}
              </p>
            </div>
          </div>

          <div className="divider divider-neutral"></div>

          <button
            className="btn btn-error w-full"
            onClick={() => navigate("/")}
          >
            <LogOut />
            Log-out
          </button>
        </div>
      </div>

      <div className="w-4/5">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
