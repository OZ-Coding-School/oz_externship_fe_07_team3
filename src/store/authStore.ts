import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type User = {
  id: number
  email: string
}

type AuthState = {
  accessToken: string | null
  user: User | null

  setAccessToken: (token: string | null) => void
  setUser: (user: User | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,

      setAccessToken: (token) =>
        set({
          accessToken: token,
        }),

      setUser: (user) =>
        set({
          user,
        }),

      logout: () =>
        set({
          accessToken: null,
          user: null,
        }),
    }),
    {
      name: 'auth-storage',
    }
  )
)
