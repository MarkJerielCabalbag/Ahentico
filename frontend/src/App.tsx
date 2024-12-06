import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="mx-10">
      <Outlet />

      {
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 3000,
          }}
        />
      }
    </div>
  );
}

export default App;
