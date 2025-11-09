"use client"

import { useMemo, useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "User ratio over months"

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

// Generate deterministic sample data per year so selecting a different year changes numbers
function sampleDataForYear(year: number) {
  return MONTHS.map((m, i) => ({
    month: m,
    desktop: Math.floor(80 + ((year * 37 + i * 13) % 300)),
  }))
}

const chartConfig = {
  desktop: {
    label: "Users",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function UserRatio() {
  const currentYear = new Date().getFullYear()
  const [year, setYear] = useState<number>(currentYear)

  const years = useMemo(() => {
    // show a small range: current year and 4 previous years
    return Array.from({ length: 5 }).map((_, idx) => currentYear - idx)
  }, [currentYear])

  const chartData = useMemo(() => sampleDataForYear(year), [year])

  return (
    <Card className="h-full dark:border-[#F4B057]">
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <div>
            <CardTitle>User Ratio</CardTitle>
            <CardDescription>{`January - December ${year}`}</CardDescription>
          </div>

          <div>
            <label htmlFor="year-select" className="sr-only">
              Select year
            </label>
            <select
              id="year-select"
              value={String(year)}
              onChange={(e) => setYear(Number(e.target.value))}
              className="rounded-md border px-2 py-1 text-sm bg-sidebar"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-full">
        <ChartContainer config={chartConfig} className="h-full aspect-auto">
          <BarChart accessibilityLayer data={chartData} barCategoryGap="30%" barGap={4}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={6} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
