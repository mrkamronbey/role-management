import { theme, type ThemeConfig } from 'antd'
import { BRAND_COLORS } from '@/shared/config'
import type { ThemeMode } from '@/shared/lib/theme'

const lightColors = {
  text: '#212529',
  link: BRAND_COLORS.goldDark,
  bgLayout: BRAND_COLORS.cream,
  bgContainer: '#FFFFFF',
}

const darkColors = {
  text: '#F1EFE6',
  link: BRAND_COLORS.goldLight,
  bgLayout: '#1F1E1B',
  bgContainer: '#292825',
}

export const getThemeConfig = (mode: ThemeMode): ThemeConfig => {
  const colors = mode === 'dark' ? darkColors : lightColors

  return {
    algorithm: mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: BRAND_COLORS.gold,
      colorLink: colors.link,
      colorTextBase: colors.text,
      colorBgLayout: colors.bgLayout,
      colorBgContainer: colors.bgContainer,
      borderRadius: 12,
      controlHeight: 35,
      fontFamily: "'Gilroy', -apple-system, 'Segoe UI', Roboto, sans-serif",
    },
    components: {
      Layout: {
        headerBg: colors.bgContainer,
        headerHeight: 64,
        headerPadding: '0 24px',
        siderBg: colors.bgContainer,
      },
      Button: {
        fontWeight: 500,
        primaryColor: BRAND_COLORS.dark,
      },
      Segmented: {
        borderRadiusSM: 10,
        itemSelectedBg: BRAND_COLORS.gold,
        itemSelectedColor: BRAND_COLORS.dark,
      },
      Menu: {
        itemHeight: 38,
        itemMarginBlock: 2,
        itemMarginInline: 8,
        itemBorderRadius: 10,
        groupTitleFontSize: 10,
        itemSelectedBg: BRAND_COLORS.gold,
        itemSelectedColor: BRAND_COLORS.dark,
      },
    },
  }
}
