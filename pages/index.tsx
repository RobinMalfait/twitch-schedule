import { addDays } from 'date-fns'
import { utcToZonedTime, format, zonedTimeToUtc } from 'date-fns-tz'

interface Schedule {
  date: Date
  online: boolean
}

function classNames(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Home() {
  let myTimezone = 'Europe/Brussels'
  let yourTimezone = new Intl.DateTimeFormat().resolvedOptions().timeZone

  let nowInMyTimezone = zonedTimeToUtc(new Date(2021, 4, 15, 15, 30, 0, 0), myTimezone)

  let schedule: Schedule[] = [
    { date: nowInMyTimezone, online: true },
    // { date: addDays(nowInMyTimezone, 1), online: true },
    // { date: addDays(nowInMyTimezone, 2), online: false },
    // { date: addDays(nowInMyTimezone, 3), online: true },
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
      <div className="text-white shadow-2xl bg-gray-800 rounded-lg relative bg-opacity-75 backdrop-filter backdrop-blur max-w-3xl">
        <div className="flex flex-col justify-between items-center w-full space-y-8 px-12 py-8">
          <div className="-mt-16 flex items-center w-full px-4">
            <div className="rounded shadow border-4 border-gray-900 border-opacity-75 flex-shrink-0 overflow-hidden bg-white">
              <img className="w-24 h-24" alt="My face" src="https://github.com/RobinMalfait.png" />
            </div>
            <h1 className="text-4xl font-semibold text-blue-100 p-4 mt-8">
              Robin's Stream Schedule
            </h1>
          </div>
          <div>
            <table className="w-full table-fixed">
              <thead>
                <tr>
                  <th className="text-center px-4 pt-2 pb-4">
                    <div className="flex flex-col text-left text-2xl">
                      <span className="text-blue-100">Your Timezone</span>
                      <span className="text-lg font-normal text-blue-200">{yourTimezone}</span>
                    </div>
                  </th>
                  <th className="hidden md:table-cell text-center px-4 pt-2 pb-4">
                    <div className="flex flex-col text-left text-2xl">
                      <span className="text-blue-100">Robin's Timezone</span>
                      <span className="text-lg font-normal text-blue-200">{myTimezone}</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((info) => (
                  <tr key={info.date.toISOString()}>
                    <td className="text-left px-4 py-1">
                      <div
                        title={info.online ? 'Online' : 'Offline'}
                        className={classNames(
                          'border-l-4 bg-gray-900 font-semibold py-2 text-center tabular-nums transform -skew-x-6 shadow',
                          info.online
                            ? 'border-blue-900 text-blue-200 text-opacity-75'
                            : 'border-gray-700 text-gray-500 text-opacity-50'
                        )}
                      >
                        {format(utcToZonedTime(info.date, yourTimezone), 'E p', {
                          timeZone: yourTimezone,
                        })}
                      </div>
                    </td>
                    <td className="hidden md:table-cell text-left px-4 py-1">
                      <div
                        title={info.online ? 'Online' : 'Offline'}
                        className={classNames(
                          'border-l-4 bg-gray-900 font-semibold py-2 text-center tabular-nums transform -skew-x-6 shadow',
                          info.online
                            ? 'border-blue-900 text-blue-200 text-opacity-75'
                            : 'border-gray-700 text-gray-500 text-opacity-50'
                        )}
                      >
                        {format(utcToZonedTime(info.date, myTimezone), 'E p', {
                          timeZone: myTimezone,
                        })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-12">
            <a className="text-blue-200 text-sm" href="https://twitch.tv/RobinMalfait">
              twitch.tv/RobinMalfait
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
