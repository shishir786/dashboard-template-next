"use client"
import RecentUser from '@/components/RecentUser'
import { UserRatio } from '@/components/UserRatio'
import { Calendar } from '@/components/ui/calendar'
import React from 'react'

const Dashbaord = () => {
const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    <>
     {/* upper 2 blocks */}
      <div
        className="w-full flex bg-sidebar rounded-lg shadow-sm items-center justify-center border border-[#E2E8F0] dark:border-[#F4B057] max-md:py-4"
        style={{ minHeight: "110px" }}
      >
        <div className="flex-1 flex flex-col items-center justify-center">
          <p className="text-[#0D2357] dark:text-white text-2xl ipad:text-3xl lg:text-4xl max-md:text-xl font-bold mb-2 max-md:mb-1">
            7.8k
          </p>
          <span className="text-[#0D2357] dark:text-white text-sm ipad:text-base lg:text-lg max-md:text-xs font-medium text-center max-md:px-2">
            Total Distributor
          </span>
        </div>
        <div className="w-px h-16 max-md:h-12 bg-[#F4B057] mx-4 ipad:mx-8 max-md:mx-3" />
        <div className="flex-1 flex flex-col items-center justify-center">
          <p className="text-[#0D2357] dark:text-white text-2xl ipad:text-3xl lg:text-4xl max-md:text-xl font-bold mb-2 max-md:mb-1">
            249
          </p>
          <span className="text-[#0D2357] dark:text-white text-sm ipad:text-base lg:text-lg max-md:text-xs font-medium text-center max-md:px-2">
            Total Employer
          </span>
        </div>
      </div>
      {/* user ratio and calendar side-by-side */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 ">
        {/* Chart: flexible column */}
        <div className="h-[400px] ">
          <UserRatio />
        </div>

        {/* Calendar: narrower column (4 of 12) and padded card */}
        <div className="">
          <div className="h-[400px] w-[320px] ">
            <div className="h-full w-full border border-border rounded-lg bg-card overflow-hidden p-5 dark:border-[#F4B057]">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-lg border bg-sidebar h-full w-full "
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <RecentUser />
      </div>
    </>
  )
}

export default Dashbaord
