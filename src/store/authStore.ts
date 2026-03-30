import { create } from 'zustand'

type User = {
  id: number
  email: string
}

type AuthState = {
  accessToken: string | null
  user: User | null
  isAuthInitialized: boolean

  setAccessToken: (token: string | null) => void
  setUser: (user: User | null) => void
  setAuthInitialized: (value: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  isAuthInitialized: false,

  setAccessToken: (token) => set({ accessToken: token }),
  setUser: (user) => set({ user }),
  setAuthInitialized: (value) => set({ isAuthInitialized: value }),

  logout: () =>
    set({
      accessToken: null,
      user: null,
      isAuthInitialized: true,
    }),
}))
