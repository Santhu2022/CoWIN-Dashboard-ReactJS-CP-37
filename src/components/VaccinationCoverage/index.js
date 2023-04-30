import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {last7DaysData} = props

  const DataFormatter = number => (number > 1000 ? `${number / 1000}k` : number)

  return (
    <div className="chart-bg-container">
      <h1 className="chart-heading">Vaccination Coverage</h1>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={last7DaysData}
          margin={{
            top: 5,
          }}
        >
          <XAxis
            dataKey="vaccineDate"
            tick={{
              stroke: 'gray',
              strokeWidth: 1,
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: 'gray',
              strokeWidth: 0,
            }}
          />
          <Legend
            wrapperStyle={{
              padding: 30,
            }}
          />
          <Tooltip />
          <Bar dataKey="dose1" name="Dose 1" fill="#5a8dee" barSize="20%" />
          <Bar dataKey="dose2" name="Dose 2" fill="#f54394" barSize="20%" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationCoverage
