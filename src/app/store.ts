import { create } from 'zustand'
import {
  defaultLanguage,
  isAppLanguage,
  languageStorageKey,
  type AppLanguage,
} from '../lib/i18n/translations'
import type { UserRole } from '../types/domain'

type AppState = {
  clearSelectedRole: () => void
  language: AppLanguage
  selectedRole: UserRole | null
  setLanguage: (language: AppLanguage) => void
  setSelectedRole: (role: UserRole) => void
}

function getInitialLanguage(): AppLanguage {
  if (typeof window === 'undefined') {
    return defaultLanguage
  }

  try {
    const storedLanguage = window.localStorage.getItem(languageStorageKey)

    return isAppLanguage(storedLanguage) ? storedLanguage : defaultLanguage
  } catch {
    return defaultLanguage
  }
}

function persistLanguage(language: AppLanguage) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(languageStorageKey, language)
  } catch {
    // Storage can be unavailable in private browsing or locked-down webviews.
  }
}

export const useAppStore = create<AppState>((set) => ({
  clearSelectedRole: () => set({ selectedRole: null }),
  language: getInitialLanguage(),
  selectedRole: null,
  setLanguage: (language) => {
    persistLanguage(language)
    set({ language })
  },
  setSelectedRole: (role) => set({ selectedRole: role }),
}))
