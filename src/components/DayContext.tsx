"use client"
import { createContext, useContext, useState } from "react"

type Item = {
  date: string
  id: string
  text: string
}

type DayContextProvider = React.PropsWithChildren & {}

export const DayContext = createContext<DayItems | null>(null)
export const useDayItems = () => useContext(DayContext)!

export function createDayItems() {
  return useState<Item[]>([
    {
      date: "10/06/2024",
      id: "123",
      text: "Walk with Mike",
    },
  ])
}
type DayItems = ReturnType<typeof createDayItems>

export function DayProvider({ children }: DayContextProvider) {
  return (
    <DayContext.Provider value={createDayItems()}>
      {children}
    </DayContext.Provider>
  )
}
