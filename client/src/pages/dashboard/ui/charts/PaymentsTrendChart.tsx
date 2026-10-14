import dayjs from 'dayjs'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { BRAND_COLORS } from '@/shared/config'
import { formatMoney } from '@/shared/lib/format'
import { useChartTheme } from '../../lib/useChartTheme'

interface PaymentsTrendChartProps {
  data: { date: string; amount: number }[]
}

const formatMillions = (value: number) => `${Math.round(value / 1_000_000)} mln`

export const PaymentsTrendChart = ({ data }: PaymentsTrendChartProps) => {
  const chart = useChartTheme()

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke={chart.gridColor} />
        <XAxis
          dataKey="date"
          tickFormatter={(date: string) => dayjs(date).format('DD.MM')}
          tick={chart.tick}
          axisLine={false}
          tickLine={false}
          minTickGap={24}
        />
        <YAxis
          tickFormatter={formatMillions}
          tick={chart.tick}
          axisLine={false}
          tickLine={false}
          width={64}
        />
        <Tooltip
          formatter={(value) => [formatMoney(Number(value)), 'Summa']}
          labelFormatter={(date) => dayjs(String(date)).format('DD.MM.YYYY')}
          cursor={{ fill: chart.cursorColor }}
          contentStyle={chart.tooltipStyle}
        />
        <Bar dataKey="amount" fill={BRAND_COLORS.primary} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
