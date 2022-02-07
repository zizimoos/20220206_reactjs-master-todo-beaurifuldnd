import { atom, selector } from "recoil";

export interface ITodoUnitObject {
  id: number;
  text: string;
}

interface ITtodoState {
  [key: string]: ITodoUnitObject[];
}

const TODO_LIST = localStorage.getItem("TODO_LIST");
const allBoards = TODO_LIST ? JSON.parse(TODO_LIST) : {};

export const todoListState = atom<ITtodoState>({
  key: "todoListState",
  default: {
    TODO: allBoards["TODO"] || [],
    DOIN: allBoards["DOIN"] || [],
    DONE: allBoards["DONE"] || [],
  },
});
