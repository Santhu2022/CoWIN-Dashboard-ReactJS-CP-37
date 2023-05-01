import {
  PieChart,
  Pie,
  Legend,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

import './index.css'

const VaccinationByAge = props => {
  const {vaccinationByAgeData} = props
  return (
    <div className="chart-bg-container">
      <h1 className="chart-heading">Vaccination by age</h1>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            cx="50%"
            cy="40%"
            data={vaccinationByAgeData}
            outerRadius="60%"
            dataKey="count"
            nameKey="age"
          >
            <Cell fill="#2d87bb" />
            <Cell fill="#a3df9f" />
            <Cell fill="#64c2a6" />
          </Pie>
          <Legend
            iconType="circle"
            wrapperStyle={{fontSize: 12, fontFamily: 'Roboto'}}
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByAge
