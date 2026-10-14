import { theme } from 'antd'
import {
  Legend,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { useChartTheme } from '../../lib/useChartTheme'

interface RolesRadialChartProps {
  data: { name: string; count: number; fill: string }[]
}

export const RolesRadialChart = ({ data }: RolesRadialChartProps) => {
  const { token } = theme.useToken()
  const chart = useChartTheme()
  const max = Math.max(...data.map((item) => item.count), 1)

  return (
    <ResponsiveContainer width="100%" height={280}>
      <RadialBarChart
        data={data}
        innerRadius="30%"
        outerRadius="95%"
        startAngle={90}
        endAngle={-270}
        barSize={14}
      >
        <PolarAngleAxis type="number" domain={[0, max]} tick={false} />
        <RadialBar
          dataKey="count"

          background={{ fill: chart.cursorColor }}
          cornerRadius={8}
        />
        <Tooltip
          formatter={(value, _name, item) => [`${value} ta`, item.payload.name]}
          labelStyle={{ display: 'none' }}
          contentStyle={chart.tooltipStyle}
          itemStyle={chart.tooltipItemStyle}
        />
        <Legend formatter={(value) => <span style={{ color: token.colorText }}>{value}</span>} />
      </RadialBarChart>
    </ResponsiveContainer>
  )
}
