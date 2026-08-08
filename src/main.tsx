import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import "./index.css";
import "../src/lib/pwa";
import { routeTree } from "./routeTree.gen";
import { AnimatedResourceWrapper } from "./components/custom/AnimatedBackground";

const router = createRouter({ routeTree });
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AnimatedResourceWrapper>
      <RouterProvider router={router}></RouterProvider>
    </AnimatedResourceWrapper>
  </StrictMode>,
);
