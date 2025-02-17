import { AuthProvider } from "@/contexts/AuthContext"
import { NavigationProvider } from "@/contexts/NavigationContext"
import { MainContent } from "@/components/MainContent"

export default function Home() {
  return (
    <AuthProvider>
      <NavigationProvider>
        <main className="container mx-auto p-4">
          <MainContent />
        </main>
      </NavigationProvider>
    </AuthProvider>
  )
}

