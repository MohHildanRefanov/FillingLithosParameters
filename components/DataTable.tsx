"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"

type DataItem = {
  id: number
  name: string
  value: number
}

const initialData: DataItem[] = [
  { id: 1, name: "Item 1", value: 100 },
  { id: 2, name: "Item 2", value: 200 },
  { id: 3, name: "Item 3", value: 300 },
]

export default function DataTable() {
  const [data, setData] = useState(initialData)
  const [userType, setUserType] = useState<"guest" | "admin" | null>(null)

  // In a real application, you would get the user type from an authentication context
  // For this example, we'll use a button to toggle between guest and admin
  const toggleUserType = () => {
    setUserType(userType === "guest" ? "admin" : "guest")
  }

  const handleValueChange = (id: number, newValue: string) => {
    setData(data.map((item) => (item.id === id ? { ...item, value: Number.parseInt(newValue) || 0 } : item)))
  }

  return (
    <div>
      <button onClick={toggleUserType} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
        Toggle User Type (Current: {userType || "Not Set"})
      </button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                {userType === "admin" ? (
                  <Input
                    type="number"
                    value={item.value}
                    onChange={(e) => handleValueChange(item.id, e.target.value)}
                  />
                ) : (
                  item.value
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

