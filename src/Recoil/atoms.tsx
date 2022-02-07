import { atom, selector } from "recoil";

export const todoListState = atom({
  key: "todoListState",
  default: {
    TODO: ["a", "b", "c"],
    DOIN: ["d", "e", "f"],
    DONE: ["g", "h", "i"],
  },
});
