"use client"

import type React from "react"

import { createContext, useContext, useReducer, type ReactNode } from "react"

type TableState = {
  data: any[]
  history: any[][]
  currentIndex: number
  tableColor: string
}

type TableAction =
  | { type: "UPDATE_DATA"; payload: any[] }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "ADD_ROW" }
  | { type: "DELETE_ROW"; payload: number }
  | { type: "UPDATE_COLOR"; payload: string }

const TableContext = createContext<
  | {
      state: TableState
      dispatch: React.Dispatch<TableAction>
    }
  | undefined
>(undefined)

function tableReducer(state: TableState, action: TableAction): TableState {
  switch (action.type) {
    case "UPDATE_DATA":
      return {
        ...state,
        data: action.payload,
        history: [...state.history.slice(0, state.currentIndex + 1), action.payload],
        currentIndex: state.currentIndex + 1,
      }
    case "UNDO":
      if (state.currentIndex > 0) {
        return {
          ...state,
          data: state.history[state.currentIndex - 1],
          currentIndex: state.currentIndex - 1,
        }
      }
      return state
    case "REDO":
      if (state.currentIndex < state.history.length - 1) {
        return {
          ...state,
          data: state.history[state.currentIndex + 1],
          currentIndex: state.currentIndex + 1,
        }
      }
      return state
    case "ADD_ROW":
      const newRow = {
        no: state.data.length + 1,
        description: "",
        before: "",
        after: "",
        date: "",
      }
      return {
        ...state,
        data: [...state.data, newRow],
        history: [...state.history.slice(0, state.currentIndex + 1), [...state.data, newRow]],
        currentIndex: state.currentIndex + 1,
      }
    case "DELETE_ROW":
      const newData = state.data.filter((_, index) => index !== action.payload)
      return {
        ...state,
        data: newData,
        history: [...state.history.slice(0, state.currentIndex + 1), newData],
        currentIndex: state.currentIndex + 1,
      }
    case "UPDATE_COLOR":
      return {
        ...state,
        tableColor: action.payload,
      }
    default:
      return state
  }
}

export function TableProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(tableReducer, {
    data: [],
    history: [[]],
    currentIndex: 0,
    tableColor: "#90EE90",
  })

  return <TableContext.Provider value={{ state, dispatch }}>{children}</TableContext.Provider>
}

export const useTable = () => {
  const context = useContext(TableContext)
  if (context === undefined) {
    throw new Error("useTable must be used within a TableProvider")
  }
  return context
}

