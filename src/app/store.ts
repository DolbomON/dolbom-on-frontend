import { create } from 'zustand'
import type { UserRole } from '../types/domain'

type AppState = {
  clearSelectedRole: () => void
  selectedRole: UserRole | null
  setSelectedRole: (role: UserRole) => void
}

export const useAppStore = create<AppState>((set) => ({
  clearSelectedRole: () => set({ selectedRole: null }),
  selectedRole: null,
  setSelectedRole: (role) => set({ selectedRole: role }),
}))
