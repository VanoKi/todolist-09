import {RootState} from "../app/store.ts";
import {Todolist} from "../App.tsx";

export const selectTodoLists = (state: RootState): Todolist[] => state.todolists
