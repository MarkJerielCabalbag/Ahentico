import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Auth from "./auth/Auth.tsx";
import SignUp from "./auth/SignUp.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./pages/Layout.tsx";
import Ahente from "./pages/Ahente.tsx";
import Home from "./pages/Home.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public Routes */}
      <Route index path="/" element={<Auth />} />
      <Route path="/register" element={<SignUp />} />

      {/* Routes with Layout Wrapper */}
      <Route path="/" element={<Layout />}>
        <Route path="home/:id" element={<Home />} />
        <Route path="ahente/:id" element={<Ahente />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
