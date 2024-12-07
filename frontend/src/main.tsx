import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Auth from "./auth/Auth.tsx";
import PrivateRoute from "./auth/PrivateRoute.tsx";
import Pages from "./app/Pages.tsx";
import Home from "./pages/Home.tsx";
import Distributor from "./pages/Distributor.tsx";

const client = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Auth />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/flowStock" element={<Pages />}>
          <Route path="/flowStock" index={true} element={<Home />} />
          <Route path="/flowStock/distributor" element={<Distributor />} />
        </Route>
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
