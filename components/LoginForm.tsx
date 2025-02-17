"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/AuthContext"

export default function LoginForm() {
  const { login } = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const success = login(username, password)
    if (!success) {
      setError("Invalid credentials")
    }
  }

  const handleGuestLogin = () => {
    login("guest", "")
  }

  return (
    <Card className="w-[350px] mx-auto mt-20">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="space-y-2">
            <Button className="w-full" type="submit">
              Login as Admin
            </Button>
            <Button className="w-full" type="button" variant="outline" onClick={handleGuestLogin}>
              Login as Guest
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

