import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App.jsx";
import { RoutineUserProvider } from "./providers/RoutineUserContext.jsx";
import { RoutineTechProvider } from "./providers/TechContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <RoutineUserProvider>
          <RoutineTechProvider>
            <App />
          </RoutineTechProvider>
        </RoutineUserProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
