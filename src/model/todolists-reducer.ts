import {v1} from 'uuid'
import type {FilterValues, Todolist} from '../App'
import {createAction} from "@reduxjs/toolkit";

export const deleteTodolistAC = createAction<{ id: string }>('todolists/deleteTodoList')
export const changeTodolistTitleAC = createAction<{id: string, title: string}>('todolists/changeTodolistTitle')
export const changeTodolistFilterAC = createAction<{id:string, filter: FilterValues}>('todolists/changeTodolistFilter')

const initialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
  switch (action.type) {
    case 'delete_todolist': {
      return state.filter(todolist => todolist.id !== action.payload.id)
    }
    case 'create_todolist': {
      const newTodolist: Todolist = {id: action.payload.id, title: action.payload.title, filter: 'all'}
      return [...state, newTodolist]
    }
    case 'change_todolist_title': {
      return state.map(todolist => todolist.id === action.payload.id ? {...todolist, title: action.payload.title} : todolist)
    }
    case 'change_todolist_filter': {
      return state.map(todolist => todolist.id === action.payload.id ? {...todolist, filter: action.payload.filter} : todolist)
    }
    default:
      return state
  }
}

export const createTodolistAC = (title: string) => {
  return {type: 'create_todolist', payload: { title, id: v1() }} as const
}

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>

type Actions =
    | DeleteTodolistAction
    | CreateTodolistAction
    | ChangeTodolistTitleAction
    | ChangeTodolistFilterAction
