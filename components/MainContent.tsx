"use client"

import { useAuth } from "@/contexts/AuthContext"
import LoginForm from "./LoginForm"
import Navigation from "./Navigation"

export function MainContent() {
  const { userType } = useAuth()

  if (!userType) {
    return <LoginForm />
  }

  return <Navigation />
}

