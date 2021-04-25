import { addDays } from 'date-fns'
import { utcToZonedTime, format } from 'date-fns-tz'

interface Schedule {
  date: Date
  online: boolean
}

export default function Home() {
  let myTimezone = 'Europe/Brussels'
  let yourTimezone = new Intl.DateTimeFormat().resolvedOptions().timeZone

  let nowInMyTimezone = new Date()

  let schedule: Schedule[] = [
    { date: nowInMyTimezone, online: true },
    { date: addDays(nowInMyTimezone, 1), online: true },
    { date: addDays(nowInMyTimezone, 2), online: false },
    { date: addDays(nowInMyTimezone, 3), online: true },
  ]

  return (
    <div className="relative flex flex-col h-screen w-full items-center justify-center">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&&sat=-100"
          alt=""
        />
        <div className="absolute inset-0 bg-gray-600 mix-blend-multiply" aria-hidden="true" />
      </div>
      <div className="text-white shadow-2xl bg-gray-800 rounded-lg relative bg-opacity-75 backdrop-filter backdrop-blur-sm">
        <div className="flex justify-between items-center w-full space-x-12 px-12 py-8">
          <div className="rounded-lg shadow flex-shrink-0 overflow-hidden bg-white">
            <img className="w-24 h-24" alt="My face" src="https://github.com/RobinMalfait.png" />
          </div>
          <div>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-center px-4 pt-2 pb-4">
                    <div className="flex flex-col text-left text-2xl">
                      <span>Robin's Timezone</span>
                      <span className="text-lg font-normal text-gray-300">{myTimezone}</span>
                    </div>
                  </th>
                  <th className="text-center px-4 pt-2 pb-4">
                    <div className="flex flex-col text-left text-2xl">
                      <span>Your Timezone</span>
                      <span className="text-lg font-normal text-gray-300">{yourTimezone}</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((info) => {
                  return (
                    <tr key={info.date.toISOString()}>
                      <td className="text-left px-4 py-1">
                        <div className="border-l-4 border-blue-900 bg-gray-900 text-blue-200 text-opacity-75 font-semibold py-2 text-center tabular-nums transform -skew-x-6 shadow">
                          {format(utcToZonedTime(info.date, myTimezone), 'E p', {
                            timeZone: myTimezone,
                          })}
                        </div>
                      </td>
                      <td className="text-left px-4 py-1">
                        <div className="border-l-4 border-blue-900 bg-gray-900 text-blue-200 text-opacity-75 font-semibold py-2 text-center tabular-nums transform -skew-x-6 shadow">
                          {format(utcToZonedTime(info.date, yourTimezone), 'E p', {
                            timeZone: yourTimezone,
                          })}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
