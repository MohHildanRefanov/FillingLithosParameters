"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { useTable } from "@/contexts/TableContext"
import Image from "next/image"
import { Undo2, Redo2, Plus, Trash2, ImageIcon } from "lucide-react"

type MechanicalData = {
  no: number
  description: string
  before: string
  after: string
  date: string
  picture: string
}

const initialData: MechanicalData[] = [
  {
    no: 1,
    description: "Case Magazine Width",
    before: "0428",
    after: "0448",
    date: "",
    picture: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-93ZjkejQnfW7nmsaz9HvwGNjSl6F2N.png",
  },
  {
    no: 2,
    description: "Case Magazine Height",
    before: "2730",
    after: "",
    date: "",
    picture: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-93ZjkejQnfW7nmsaz9HvwGNjSl6F2N.png",
  },
  {
    no: 3,
    description: "Pick Up Lower Vacuum Cup",
    before: "16",
    after: "11",
    date: "",
    picture: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-93ZjkejQnfW7nmsaz9HvwGNjSl6F2N.png",
  },
]

export default function MechanicalTable() {
  const { userType, currentAdmin } = useAuth()
  const { state, dispatch } = useTable()
  const [activityLog, setActivityLog] = useState<
    Array<{
      admin: string
      action: string
      timestamp: string
    }>
  >([])
  const isAdmin = userType === "admin"

  const [editableCell, setEditableCell] = useState<{
    row: number
    col: string
  } | null>(null)

  const handleEdit = (rowIndex: number, field: keyof MechanicalData, value: string) => {
    const newData = [...state.data]
    newData[rowIndex][field] = value
    dispatch({ type: "UPDATE_DATA", payload: newData })

    if (currentAdmin) {
      setActivityLog([
        ...activityLog,
        {
          admin: currentAdmin.name,
          action: `Changed ${field} in row ${rowIndex + 1}`,
          timestamp: new Date().toISOString(),
        },
      ])
    }
  }

  const handleImageUpload = async (rowIndex: number, file: File) => {
    // In a real application, you would upload the file to your server
    // For this example, we'll use a placeholder URL
    const newData = [...state.data]
    newData[rowIndex].picture = URL.createObjectURL(file)
    dispatch({ type: "UPDATE_DATA", payload: newData })
  }

  return (
    <div className="space-y-4">
      {isAdmin && (
        <div className="flex items-center space-x-4 mb-4">
          <Button variant="outline" size="icon" onClick={() => dispatch({ type: "UNDO" })}>
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => dispatch({ type: "REDO" })}>
            <Redo2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={() => dispatch({ type: "ADD_ROW" })}>
            <Plus className="h-4 w-4 mr-2" />
            Add Row
          </Button>
          <Input
            type="color"
            value={state.tableColor}
            onChange={(e) => dispatch({ type: "UPDATE_COLOR", payload: e.target.value })}
            className="w-20"
          />
        </div>
      )}

      <div className="border rounded-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="border border-black text-center font-bold"
                style={{ backgroundColor: state.tableColor }}
              >
                NO
              </TableHead>
              <TableHead
                className="border border-black text-center font-bold"
                style={{ backgroundColor: state.tableColor }}
              >
                Description
              </TableHead>
              <TableHead
                colSpan={3}
                className="border border-black text-center font-bold"
                style={{ backgroundColor: state.tableColor }}
              >
                Mechanic Parameter
              </TableHead>
              <TableHead
                className="border border-black text-center font-bold"
                style={{ backgroundColor: state.tableColor }}
              >
                Picture
              </TableHead>
              {isAdmin && (
                <TableHead
                  className="border border-black text-center font-bold"
                  style={{ backgroundColor: state.tableColor }}
                >
                  Actions
                </TableHead>
              )}
            </TableRow>
            <TableRow>
              <TableHead className="border border-black"></TableHead>
              <TableHead className="border border-black"></TableHead>
              <TableHead
                className="border border-black text-center font-bold"
                style={{ backgroundColor: state.tableColor }}
              >
                Before
              </TableHead>
              <TableHead
                className="border border-black text-center font-bold"
                style={{ backgroundColor: state.tableColor }}
              >
                After
              </TableHead>
              <TableHead
                className="border border-black text-center font-bold"
                style={{ backgroundColor: state.tableColor }}
              >
                Date
              </TableHead>
              <TableHead className="border border-black"></TableHead>
              {isAdmin && <TableHead className="border border-black"></TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {state.data.map((row: MechanicalData, index) => (
              <TableRow key={row.no}>
                <TableCell className="border border-black text-center">{row.no}</TableCell>
                <TableCell className="border border-black">
                  {isAdmin && editableCell?.row === index && editableCell?.col === "description" ? (
                    <Input
                      value={row.description}
                      onChange={(e) => handleEdit(index, "description", e.target.value)}
                      onBlur={() => setEditableCell(null)}
                      autoFocus
                    />
                  ) : (
                    <div
                      onClick={() => isAdmin && setEditableCell({ row: index, col: "description" })}
                      className={isAdmin ? "cursor-pointer" : ""}
                    >
                      {row.description}
                    </div>
                  )}
                </TableCell>
                <TableCell className="border border-black">
                  {isAdmin && editableCell?.row === index && editableCell?.col === "before" ? (
                    <Input
                      value={row.before}
                      onChange={(e) => handleEdit(index, "before", e.target.value)}
                      onBlur={() => setEditableCell(null)}
                      autoFocus
                    />
                  ) : (
                    <div
                      onClick={() => isAdmin && setEditableCell({ row: index, col: "before" })}
                      className={isAdmin ? "cursor-pointer" : ""}
                    >
                      {row.before}
                    </div>
                  )}
                </TableCell>
                <TableCell className="border border-black">
                  {isAdmin && editableCell?.row === index && editableCell?.col === "after" ? (
                    <Input
                      value={row.after}
                      onChange={(e) => handleEdit(index, "after", e.target.value)}
                      onBlur={() => setEditableCell(null)}
                      autoFocus
                    />
                  ) : (
                    <div
                      onClick={() => isAdmin && setEditableCell({ row: index, col: "after" })}
                      className={isAdmin ? "cursor-pointer" : ""}
                    >
                      {row.after}
                    </div>
                  )}
                </TableCell>
                <TableCell className="border border-black">
                  {isAdmin && editableCell?.row === index && editableCell?.col === "date" ? (
                    <Input
                      value={row.date}
                      onChange={(e) => handleEdit(index, "date", e.target.value)}
                      onBlur={() => setEditableCell(null)}
                      autoFocus
                    />
                  ) : (
                    <div
                      onClick={() => isAdmin && setEditableCell({ row: index, col: "date" })}
                      className={isAdmin ? "cursor-pointer" : ""}
                    >
                      {row.date}
                    </div>
                  )}
                </TableCell>
                <TableCell className="border border-black">
                  {row.picture ? (
                    <div className="relative w-24 h-24">
                      <Image
                        src={row.picture || "/placeholder.svg"}
                        alt={row.description}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 bg-gray-100 flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                  {isAdmin && (
                    <Input
                      type="file"
                      accept="image/*"
                      className="mt-2"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          handleImageUpload(index, file)
                        }
                      }}
                    />
                  )}
                </TableCell>
                {isAdmin && (
                  <TableCell className="border border-black">
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => dispatch({ type: "DELETE_ROW", payload: index })}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {isAdmin && activityLog.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Activity Log</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Admin</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activityLog.map((log, index) => (
                <TableRow key={index}>
                  <TableCell>{log.admin}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

