import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { isMobileDevice, isStandalone } from "../lib/pwaDetection";
import InstallationRequired from "../components/custom/InstallationRequired";
import MobileRequired from "../components/custom/MobileRequired";
import GameDialog from "../components/custom/GameDialog";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  if (!isMobileDevice()) {
    return <MobileRequired />;
  }

  if (!isStandalone()) {
    return <InstallationRequired />;
  }

  return (
    <React.Fragment>
      <Outlet />
      <GameDialog />
    </React.Fragment>
  );
}
