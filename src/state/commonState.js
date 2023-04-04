import { atom } from "recoil";

const menuState = atom({
  key: "sidemenu",
  default: false
});

export {menuState};