import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { useChartTheme } from '../../lib/useChartTheme'

interface TypesRadarChartProps {
  data: { label: string; count: number }[]
  color: string
}

export const TypesRadarChart = ({ data, color }: TypesRadarChartProps) => {
  const chart = useChartTheme()

  return (
    <ResponsiveContainer width="100%" height={280}>
      <RadarChart data={data} outerRadius="70%" margin={{ left: 40, right: 40 }}>
        <PolarGrid stroke={chart.gridColor} />
        <PolarAngleAxis dataKey="label" tick={chart.tick} />
        <PolarRadiusAxis allowDecimals={false} tick={false} axisLine={false} />
        <Radar dataKey="count" stroke={color} fill={color} fillOpacity={0.35} />
        <Tooltip formatter={(value) => [`${value} ta`, 'Soni']} contentStyle={chart.tooltipStyle} />
      </RadarChart>
    </ResponsiveContainer>
  )
}
