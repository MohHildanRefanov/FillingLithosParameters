"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type UserType = "admin" | "guest" | null
type AdminUser = {
  username: string
  name: string
}

type AuthContextType = {
  userType: UserType
  currentAdmin: AdminUser | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const adminUsers: { [key: string]: { password: string; name: string } } = {
  "Admin 1": { password: "admin111", name: "Admin 1" },
  "Admin 2": { password: "admin222", name: "Admin 2" },
  "Admin 3": { password: "admin333", name: "Admin 3" },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userType, setUserType] = useState<UserType>(null)
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null)

  const login = (username: string, password: string) => {
    if (username in adminUsers && adminUsers[username].password === password) {
      setUserType("admin")
      setCurrentAdmin({ username, name: adminUsers[username].name })
      return true
    } else if (username === "guest" && password === "") {
      setUserType("guest")
      setCurrentAdmin(null)
      return true
    }
    return false
  }

  const logout = () => {
    setUserType(null)
    setCurrentAdmin(null)
  }

  return <AuthContext.Provider value={{ userType, currentAdmin, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

