import Footer from "@/components/Footer";
import Header from "@/components/Header";

import { Outlet } from "react-router-dom";

const Pages = () => {
  return (
    <>
      <Header />
      <div className="h-screen">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Pages;
