"use client"
import { Day } from "@/components/Day"
import { DayProvider } from "@/components/DayContext"
import { Container } from "@/components/app/Container"
import { useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

const WEEKDAYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
]

const getAllDaysInMonth = (month: number, year: number) =>
  Array.from(
    { length: new Date(year, month, 0).getDate() },
    (_, i) => new Date(year, month - 1, i + 1)
  )

export default function Home() {
  const [month, setMonth] = useState(6)

  const previous = () => setMonth(m => m - 1)
  const next = () => setMonth(m => m + 1)

  const ALL_DAYS_SHOWN_GRID_AMOUNT = 7 * 6
  const lastMonth = getAllDaysInMonth(month - 1, 2024)
  const nextMonth = getAllDaysInMonth(month + 1, 2024)

  const currentMonthRendering = getAllDaysInMonth(month, 2024)
  const offset = currentMonthRendering[0].getDay()
  const lastMonthRendering = lastMonth
    .toReversed()
    .splice(0, offset)
    .toReversed()
  const renderedDays = currentMonthRendering.length + lastMonthRendering.length
  const nextMonthRendering = nextMonth.splice(
    0,
    ALL_DAYS_SHOWN_GRID_AMOUNT - renderedDays
  )

  return (
    <main className="[--gap:0rem] [--items-per-line:7]">
      <div className="flex justify-between h-16 max-w-4xl w-full mx-auto border border-white">
        <button
          className="aspect-square grid place-items-center hover:bg-neutral-900"
          onClick={previous}
        >
          {"<"}
        </button>
        <button
          className="aspect-square grid place-items-center hover:bg-neutral-950"
          onClick={next}
        >
          {">"}
        </button>
      </div>
      <DndProvider backend={HTML5Backend}>
        <div className="max-w-4xl p-4 w-full mx-auto">
          <ul className="flex flex-wrap gap-[--gap]">
            {WEEKDAYS.map(weekday => (
              <li className="basis-[calc(100%/var(--items-per-line)_-_var(--gap)/(var(--items-per-line)/(var(--items-per-line)-1)))]">
                {weekday}
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-[--gap]">
            {lastMonthRendering.map(date => (
              <Day
                key={date.getTime()}
                date={date}
              />
            ))}
            {currentMonthRendering.map(date => (
              <Day
                key={date.getTime()}
                date={date}
                currentMonth
              />
            ))}
            {nextMonthRendering.map(date => (
              <Day
                key={date.getTime()}
                date={date}
              />
            ))}
          </ul>
        </div>
      </DndProvider>

      <DndProvider backend={HTML5Backend}>
        <Container />
      </DndProvider>
    </main>
  )
}
