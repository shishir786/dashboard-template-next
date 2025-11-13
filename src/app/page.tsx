"use client"
import RecentUser from '@/components/RecentUser'
import { UserRatio } from '@/components/UserRatio'
import { Calendar } from '@/components/ui/calendar'
import React from 'react'

const Dashbaord = () => {
const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    <div className="px-4 sm:px-0">
      {/* upper 2 blocks */}
      <div
        className="w-full flex bg-sidebar rounded-lg shadow-sm items-center justify-center border border-[#E2E8F0] dark:border-[#F4B057] py-4 sm:py-6"
        style={{ minHeight: "110px" }}
      >
        <div className="flex-1 flex flex-col items-center justify-center px-2">
          <p className="text-[#0D2357] dark:text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">
            7.8k
          </p>
          <span className="text-[#0D2357] dark:text-white text-xs sm:text-sm md:text-base lg:text-lg font-medium text-center">
            Total Distributor
          </span>
        </div>
        <div className="w-px h-12 sm:h-14 md:h-16 bg-[#F4B057] mx-3 sm:mx-4 md:mx-6 lg:mx-8" />
        <div className="flex-1 flex flex-col items-center justify-center px-2">
          <p className="text-[#0D2357] dark:text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">
            249
          </p>
          <span className="text-[#0D2357] dark:text-white text-xs sm:text-sm md:text-base lg:text-lg font-medium text-center">
            Total Employer
          </span>
        </div>
      </div>

      {/* user ratio and calendar side-by-side */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4">
        {/* Chart: flexible column */}
        <div className="h-[350px] sm:h-[400px] w-full">
          <UserRatio />
        </div>

        {/* Calendar: narrower column and padded card */}
        <div className="flex justify-center lg:justify-start">
          <div className="h-[350px] sm:h-[400px] w-full sm:w-[320px]">
            <div className="h-full w-full border border-border rounded-lg bg-card overflow-hidden p-3 sm:p-5 dark:border-[#F4B057]">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-lg border bg-sidebar h-full w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <RecentUser />
      </div>
    </div>
  )
}

export default Dashbaord
