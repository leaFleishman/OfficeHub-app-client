import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";

import { AuthProvider } from "./auth/AuthContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/AppRoutes";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}   future={{ v7_startTransition: true }}/>

      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
