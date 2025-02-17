"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type NavigationLevel = {
  fl: string | null
  system: "HMI" | "Mechanical" | null
  hmiSection: "Carton" | "Transfer" | "Opening" | "Belts" | "Timers" | "Outfeed Conveyor" | null
}

type NavigationContextType = {
  navigation: NavigationLevel
  setFL: (fl: string | null) => void
  setSystem: (system: "HMI" | "Mechanical" | null) => void
  setHMISection: (section: NavigationLevel["hmiSection"]) => void
  resetNavigation: () => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [navigation, setNavigation] = useState<NavigationLevel>({
    fl: null,
    system: null,
    hmiSection: null,
  })

  const setFL = (fl: string | null) => {
    setNavigation({ fl, system: null, hmiSection: null })
  }

  const setSystem = (system: "HMI" | "Mechanical" | null) => {
    setNavigation({ ...navigation, system, hmiSection: null })
  }

  const setHMISection = (section: NavigationLevel["hmiSection"]) => {
    setNavigation({ ...navigation, hmiSection: section })
  }

  const resetNavigation = () => {
    setNavigation({ fl: null, system: null, hmiSection: null })
  }

  return (
    <NavigationContext.Provider value={{ navigation, setFL, setSystem, setHMISection, resetNavigation }}>
      {children}
    </NavigationContext.Provider>
  )
}

export const useNavigation = () => {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider")
  }
  return context
}

