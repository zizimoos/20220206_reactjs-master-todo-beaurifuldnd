import { atom, selector } from "recoil";

export interface ITodoUnitObject {
  id: number;
  text: string;
}

interface ITtodoState {
  [key: string]: ITodoUnitObject[];
}

export const todoListState = atom<ITtodoState>({
  key: "todoListState",
  default: {
    TODO: [],
    DOIN: [],
    DONE: [],
  },
});
