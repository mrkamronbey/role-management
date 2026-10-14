import { theme, type ThemeConfig } from 'antd'
import { BRAND_COLORS } from '@/shared/config'
import type { ThemeMode } from '@/shared/lib/theme'

const palettes = {
  light: {
    primary: BRAND_COLORS.primary,
    text: '#404349',
    textSecondary: '#606671',
    textPlaceholder: '#6F747F',
    menuText: '#404349',
    bgLayout: '#E3E8EF',
    bgContainer: '#FFFFFF',
    bgInput: '#FFFFFF',
    fill: '#F3F4F6',
    border: '#D5D7DB',
    borderSecondary: '#E8E9EC',
    primaryBg: '#FAF1DC',
    rowHover: '#ECEEF1',
  },
  dark: {
    primary: '#D4A73A',
    text: '#D2D5DA',
    textSecondary: '#8B9098',
    textPlaceholder: '#565761',
    menuText: '#FFFFFF',
    bgLayout: '#0C0D12',
    bgContainer: '#16171E',
    bgInput: '#1E1F2C',
    fill: '#1E1F2C',
    border: '#2B2C38',
    borderSecondary: '#222329',
    primaryBg: '#3F3725',
    rowHover: '#26273A',
  },
}

export const getThemeConfig = (mode: ThemeMode): ThemeConfig => {
  const colors = palettes[mode]
  const inputColors = { colorBgContainer: colors.bgInput }

  return {
    algorithm: mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: colors.primary,
      colorLink: colors.primary,
      colorText: colors.text,
      colorTextSecondary: colors.textSecondary,
      colorTextPlaceholder: colors.textPlaceholder,
      colorBgLayout: colors.bgLayout,
      colorBgContainer: colors.bgContainer,
      colorBgElevated: colors.bgContainer,
      colorFillAlter: colors.fill,
      colorBorder: colors.border,
      colorBorderSecondary: colors.borderSecondary,
      colorPrimaryBg: colors.primaryBg,
      borderRadius: 12,
      controlHeight: 40,
      fontFamily: "'Gilroy', -apple-system, 'Segoe UI', Roboto, sans-serif",
    },
    components: {
      Layout: {
        headerBg: colors.bgContainer,
        headerHeight: 64,
        headerPadding: '0 24px',
        siderBg: colors.bgContainer,
        bodyBg: colors.bgLayout,
      },
      Button: {
        fontWeight: 500,
        primaryColor: '#FFFFFF',
      },
      Input: { ...inputColors, paddingInlineLG: 16 },
      InputNumber: inputColors,
      Select: inputColors,
      DatePicker: inputColors,
      Table: {
        headerBg: colors.fill,
        headerColor: colors.textSecondary,
        headerSplitColor: 'transparent',
        headerBorderRadius: 0,
        rowHoverBg: colors.rowHover,
        borderColor: colors.borderSecondary,
        fontWeightStrong: 500,
      },
      Segmented: {
        borderRadiusSM: 10,
        itemSelectedBg: colors.primary,
        itemSelectedColor: '#FFFFFF',
      },
      Menu: {
        itemHeight: 38,
        itemMarginBlock: 2,
        itemMarginInline: 8,
        itemBorderRadius: 10,
        groupTitleFontSize: 10,
        itemColor: colors.menuText,
        itemSelectedBg: colors.primary,
        itemSelectedColor: '#FFFFFF',
      },
      Card: {
        boxShadowTertiary: 'none',
      },
      Pagination: {
        itemSize: 36,
        borderRadius: 10,
      },
    },
  }
}
