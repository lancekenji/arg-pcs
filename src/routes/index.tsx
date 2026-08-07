import { createFileRoute } from "@tanstack/react-router";
import { redirectToCurrentPhase } from "../lib/router-guard";

export const Route = createFileRoute("/")({
  beforeLoad() {
    redirectToCurrentPhase();
  },

  component: RouteComponent,
});

function RouteComponent() {
  return null;
}
