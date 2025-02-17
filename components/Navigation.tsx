"use client"

import { Button } from "@/components/ui/button"
import { useNavigation } from "@/contexts/NavigationContext"
import { useAuth } from "@/contexts/AuthContext"
import { TableProvider } from "@/contexts/TableContext"
import TransportTable from "./TransportTable"
import MechanicalTable from "./MechanicalTable"

export default function Navigation() {
  const { navigation, setFL, setSystem, setHMISection, resetNavigation } = useNavigation()
  const { logout, userType } = useAuth()

  const handleLogout = () => {
    logout()
    resetNavigation()
  }

  if (!navigation.fl) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Select FL Line</h2>
        <div className="grid grid-cols-2 gap-4">
          {["FL1", "FL2", "FL3", "FL4"].map((fl) => (
            <Button key={fl} onClick={() => setFL(fl)}>
              {fl}
            </Button>
          ))}
        </div>
      </div>
    )
  }

  if (!navigation.system) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{navigation.fl}</h2>
          <Button variant="outline" onClick={() => setFL(null)}>
            Back
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button onClick={() => setSystem("HMI")}>HMI</Button>
          <Button onClick={() => setSystem("Mechanical")}>Mechanical</Button>
        </div>
      </div>
    )
  }

  if (navigation.system === "HMI" && !navigation.hmiSection) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{navigation.fl} - HMI</h2>
          <Button variant="outline" onClick={() => setSystem(null)}>
            Back
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {["Carton", "Transfer", "Opening", "Belts", "Timers", "Outfeed Conveyor"].map((section) => (
            <Button key={section} onClick={() => setHMISection(section as any)}>
              {section}
            </Button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">
          {navigation.fl} - {navigation.system}
          {navigation.hmiSection && ` - ${navigation.hmiSection}`}
        </h2>
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={() => {
              if (navigation.hmiSection) setHMISection(null)
              else setSystem(null)
            }}
          >
            Back
          </Button>
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
      <TableProvider>
        <div className="p-4 border rounded">
          {navigation.system === "Mechanical" ? (
            <MechanicalTable />
          ) : navigation.system === "HMI" && navigation.hmiSection === "Transfer" ? (
            <TransportTable />
          ) : (
            <p>
              Table content for {navigation.system}
              {navigation.hmiSection && ` - ${navigation.hmiSection}`} will be displayed here
            </p>
          )}
        </div>
      </TableProvider>
    </div>
  )
}

