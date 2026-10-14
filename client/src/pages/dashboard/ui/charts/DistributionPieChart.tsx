import { theme } from 'antd'
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { useChartTheme } from '../../lib/useChartTheme'

interface DistributionPieChartProps {
  data: { label: string; count: number; fill: string }[]
  donut?: boolean
}

export const DistributionPieChart = ({ data, donut = false }: DistributionPieChartProps) => {
  const { token } = theme.useToken()
  const chart = useChartTheme()

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="label"
          innerRadius={donut ? 60 : 0}
          outerRadius={95}
          paddingAngle={donut ? 2 : 0}
          stroke={token.colorBgContainer}
          label={donut ? false : ({ percent }) => `${Math.round((percent ?? 0) * 100)}%`}
        />
        <Tooltip formatter={(value) => [`${value} ta`, 'Soni']} contentStyle={chart.tooltipStyle} />
        <Legend formatter={(value) => <span style={{ color: token.colorText }}>{value}</span>} />
      </PieChart>
    </ResponsiveContainer>
  )
}
