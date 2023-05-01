import {
  PieChart,
  Pie,
  Legend,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

import './index.css'

const VaccinationByGender = props => {
  const {vaccinationByGenderData} = props
  return (
    <div className="chart-bg-container">
      <h1 className="chart-heading">Vaccination by gender</h1>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            cx="50%"
            cy="60%"
            data={vaccinationByGenderData}
            startAngle={180}
            endAngle={0}
            innerRadius="30%"
            outerRadius="60%"
            dataKey="count"
            nameKey="gender"
          >
            <Cell fill="#f54394" />
            <Cell fill="#5a8dee" />
            <Cell fill="#2cc6c6" />
          </Pie>
          <Legend
            iconType="circle"
            wrapperStyle={{
              fontFamily: 'Roboto',
              fontSize: 12,
            }}
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByGender
