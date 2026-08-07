import { registerSW } from "virtual:pwa-register";

export const updatePWA = registerSW({
  onNeedRefresh() {
    console.log("New version available");
  },
  // console log muna for dev debugging
  onOfflineReady() {
    console.log("App ready offline");
  },
});
