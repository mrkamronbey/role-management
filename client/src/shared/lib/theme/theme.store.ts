import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ThemeMode = 'light' | 'dark'

const systemMode: ThemeMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  ? 'dark'
  : 'light'

interface ThemeState {
  mode: ThemeMode
  toggleMode: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: systemMode,
      toggleMode: () => set((state) => ({ mode: state.mode === 'dark' ? 'light' : 'dark' })),
    }),
    { name: 'theme' },
  ),
)
