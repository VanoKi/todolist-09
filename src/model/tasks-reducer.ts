import type {TasksState} from '../app/App'
import {createTodolistAC, deleteTodolistAC} from './todolists-reducer'
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

const initialState: TasksState = {}

export const deleteTaskAC = createAction<{todolistId: string, taskId: string}>('tasks/deleteTask')
export const createTaskAC = createAction<{todolistId:string, title:string}>('tasks/createTask')
export const changeTaskStatusAC = createAction< { todolistId: string, taskId: string, isDone: boolean }>('tasks/changeTaskStatus')
export const changeTaskTitleAC = createAction< { todolistId: string, taskId: string, title: string }>('tasks/changeTaskTitle')

export const tasksReducer = createReducer(initialState, builder => {
  builder
    .addCase(deleteTodolistAC, (state, action) => {
    delete state[action.payload.id]
  })
    .addCase(createTodolistAC, (state, action) => {
      state[action.payload.id] = []
    })
    .addCase(deleteTaskAC, (state, action) => {
      const taskId = action.payload.taskId
      const index = state[action.payload.todolistId].findIndex(t => t.id === taskId)
      if(index !== -1) state[action.payload.todolistId].splice(index, 1)
    })
    .addCase(createTaskAC, (state, action) => {
      const newTask = {id: nanoid(), title: action.payload.title, isDone: false}
      state[action.payload.todolistId].unshift(newTask)
    })
    .addCase(changeTaskStatusAC, (state, action) => {
      const task = state[action.payload.todolistId].find(t => t.id === action.payload.taskId)
      if (task) task.isDone = !task.isDone
    })
    .addCase(changeTaskTitleAC, (state, action) => {
      const task = state[action.payload.todolistId].find(t => t.id === action.payload.taskId)
      if (task) task.title = action.payload.title
    })
})
