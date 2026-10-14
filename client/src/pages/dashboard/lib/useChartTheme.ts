import { theme } from 'antd'

export const useChartTheme = () => {
  const { token } = theme.useToken()

  return {
    tick: { fill: token.colorTextSecondary, fontSize: 12 },
    gridColor: token.colorBorderSecondary,
    cursorColor: token.colorFillAlter,
    tooltipItemStyle: { color: token.colorText },
    tooltipStyle: {
      background: token.colorBgElevated,
      border: `1px solid ${token.colorBorder}`,
      borderRadius: 8,
      color: token.colorText,
    },
  }
}
