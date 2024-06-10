import React from "react"
import { cn } from "@/lib/utils"
import { DayItem } from "@/components/DayItem"
import { useDrop } from "react-dnd"
import { useDayItems } from "@/components/DayContext"

export type DayProps = React.ComponentPropsWithoutRef<"li"> & {
  date: Date
  currentMonth?: boolean
}

export const Day = React.forwardRef<React.ElementRef<"li">, DayProps>(
  function DayComponent({ currentMonth, date, className, ...props }, ref) {
    const [items] = useDayItems()
    const dateItems = items.filter(i => i.date === date.toLocaleDateString())
    const [{ canDrop, isOver }, drop] = useDrop(
      () => ({
        accept: "ITEMS",
        drop: () => ({
          name: date.toLocaleDateString(),
          allowedDropEffect: "any",
        }),
        collect: (monitor: any) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
      }),
      ["any"]
    )

    const isActive = canDrop && isOver

    return (
      <li
        // @ts-ignore
        ref={drop}
        className={cn(
          "aspect-square basis-[calc(100%/var(--items-per-line)_-_var(--gap)/(var(--items-per-line)/(var(--items-per-line)-1)))] border flex flex-col gap-2",
          currentMonth ? "border-white" : "border-gray-500",
          isActive ? "bg-white/10" : canDrop ? "" : "",
          className
        )}
        {...props}
      >
        {date.getDate()}
        <div className="flex justify-center">
          {dateItems &&
            dateItems.map(item => (
              <DayItem
                itemName={item.id}
                key={item.id}
              >
                {item.text}
              </DayItem>
            ))}
        </div>
      </li>
    )
  }
)
