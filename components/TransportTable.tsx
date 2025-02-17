"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"

type TableData = {
  no: number
  description: string
  before: string
  after: string
  date: string
}

type ActivityLog = {
  admin: string
  action: string
  timestamp: string
}

const initialTableData: TableData[] = [
  {
    no: 1,
    description: "CARTON OPENING CYCLE START (UPPER TRANSPORT)",
    before: "ON = 390\nOFF = 1295",
    after: "ON = 800\nOFF = 1295",
    date: "31/01/2025",
  },
  {
    no: 2,
    description: "CARTON OPENING CYCLE START (LOWER TRANSPORT)",
    before: "ON = 390\nOFF = 1295",
    after: "ON = 800\nOFF = 1295",
    date: "31/01/2025",
  },
  {
    no: 3,
    description: "SHORT CARTON FLAPS UP (UPPER TRANSPORT)",
    before: "ON = 1095\nOFF = 1295",
    after: "",
    date: "",
  },
  {
    no: 4,
    description: "SHORT CARTON FLAPS UP (LOWER TRANSPORT)",
    before: "ON = 1095\nOFF = 1295",
    after: "",
    date: "",
  },
  {
    no: 5,
    description: "CARTON CONTROL FOR GLUE (UPPERR TRANSPORT)",
    before: "ON = 400\nOFF = 500",
    after: "",
    date: "",
  },
  {
    no: 6,
    description: "CARTON CONTROL FOR GLUE (LOWER TRANSPORT)",
    before: "ON = 400\nOFF = 500",
    after: "",
    date: "",
  },
  {
    no: 7,
    description: "FIRST GLUE LINE (UPPER PUSHER)",
    before: "ON = 530\nOFF = 560",
    after: "",
    date: "",
  },
  {
    no: 8,
    description: "SECOND GLUE LINE (UPPER PUSHER)",
    before: "ON = 675\nOFF = 715",
    after: "",
    date: "",
  },
  {
    no: 9,
    description: "FIRST GLUE LINE (LOWER PUSHER)",
    before: "ON = 530\nOFF = 550",
    after: "",
    date: "",
  },
  {
    no: 10,
    description: "SECOND GLUE LINE (LOWER PUSHER)",
    before: "ON = 665\nOFF = 700",
    after: "ON = 675\nOFF = 715",
    date: "31/01/2025",
  },
  {
    no: 11,
    description: "LONG CARTON FLAPS CLOSING (UPPER TRANSPORT)",
    before: "ON = 550\nOFF = 1300",
    after: "",
    date: "",
  },
  {
    no: 12,
    description: "LONG CARTON FLAPS CLOSING (LOWER TRANSPORT)",
    before: "ON = 550\nOFF = 1300",
    after: "",
    date: "",
  },
  {
    no: 13,
    description: "CARTON BOTTOM CLOSER UP (UPPER TRANSPORT)",
    before: "ON = 1150\nOFF = 1300",
    after: "",
    date: "",
  },
  {
    no: 14,
    description: "CARTON BOTTOM CLOSER UP (LOWER TRANSPORT)",
    before: "ON = 1150\nOFF = 1300",
    after: "",
    date: "",
  },
  {
    no: 15,
    description: "CARTON PUSHER BACKWARD (UPPER TRANSPORT)",
    before: "ON = 1000\nOFF = 1300",
    after: "ON = 1075\nOFF = 1300",
    date: "31/01/2025",
  },
  {
    no: 16,
    description: "CARTON PUSHER BACKWARD (LOWER TRANSPORT)",
    before: "ON = 1000\nOFF = 1300",
    after: "ON = 1075\nOFF = 1300",
    date: "31/01/2025",
  },
  {
    no: 17,
    description: "CARTON PRESS UP CONTROL (UPPER TRANSPORT)",
    before: "ON = 800\nOFF = 1300",
    after: "",
    date: "",
  },
  {
    no: 18,
    description: "CARTON PRESS UP CONTROL (LOWER TRANSPORT)",
    before: "ON = 800\nOFF = 1300",
    after: "",
    date: "",
  },
  {
    no: 19,
    description: "SPARE (UPPER TRANSPORT)",
    before: "0",
    after: "",
    date: "",
  },
  {
    no: 20,
    description: "SPARE (LOWER TRANSPORT)",
    before: "0",
    after: "",
    date: "",
  },
  {
    no: 21,
    description: "SPARE (UPPER TRANSPORT)",
    before: "0",
    after: "",
    date: "",
  },
]

export default function TransportTable() {
  const [tableData, setTableData] = useState<TableData[]>(initialTableData)
  const [activityLog, setActivityLog] = useState<ActivityLog[]>([])
  const { userType, currentAdmin } = useAuth()
  const isAdmin = userType === "admin"

  const handleEdit = (index: number, field: "before" | "after", value: string) => {
    const newData = [...tableData]
    newData[index][field] = value
    setTableData(newData)

    if (currentAdmin) {
      const newLog: ActivityLog = {
        admin: currentAdmin.name,
        action: `Changed ${field} value of row ${index + 1}`,
        timestamp: new Date().toISOString(),
      }
      setActivityLog([...activityLog, newLog])
    }
  }

  const renderEditableCell = (value: string, index: number, field: "before" | "after") => {
    if (!isAdmin) return value

    const lines = value.split("\n")
    return (
      <div>
        {lines.map((line, lineIndex) => {
          const [label, number] = line.split("=")
          if (!number) return line
          return (
            <div key={lineIndex} className="flex items-center space-x-2">
              <span>{label.trim()} =</span>
              <Input
                type="number"
                value={number.trim()}
                onChange={(e) => {
                  const newLines = [...lines]
                  newLines[lineIndex] = `${label.trim()} = ${e.target.value}`
                  handleEdit(index, field, newLines.join("\n"))
                }}
                className="w-20"
              />
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="border rounded-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead rowSpan={2} className="bg-[#90EE90] border border-black w-12 text-center font-bold">
                NO
              </TableHead>
              <TableHead colSpan={4} className="bg-[#90EE90] border border-black text-center font-bold">
                TRANSFER
              </TableHead>
            </TableRow>
            <TableRow>
              <TableHead rowSpan={1} className="bg-[#90EE90] border border-black font-bold">
                TRANSPORT PHASES
              </TableHead>
              <TableHead colSpan={3} className="bg-[#90EE90] border border-black text-center font-bold">
                Parameters
              </TableHead>
            </TableRow>
            <TableRow>
              <TableHead className="bg-[#90EE90] border border-black"></TableHead>
              <TableHead className="bg-[#90EE90] border border-black text-center font-bold">Description</TableHead>
              <TableHead className="bg-[#90EE90] border border-black text-center font-bold">Before</TableHead>
              <TableHead className="bg-[#90EE90] border border-black text-center font-bold">After</TableHead>
              <TableHead className="bg-[#90EE90] border border-black text-center font-bold">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={row.no} className={row.no % 2 === 0 ? "bg-[#90EE90]/10" : ""}>
                <TableCell className="border border-black text-center">{row.no}</TableCell>
                <TableCell className="border border-black">{row.description}</TableCell>
                <TableCell className="border border-black whitespace-pre-line">
                  {renderEditableCell(row.before, index, "before")}
                </TableCell>
                <TableCell className="border border-black whitespace-pre-line">
                  {renderEditableCell(row.after, index, "after")}
                </TableCell>
                <TableCell className="border border-black text-center">{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {isAdmin && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Activity Log</h3>
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
          <div className="flex justify-end">
            <Button onClick={() => console.log(tableData, activityLog)}>Save Changes</Button>
          </div>
        </div>
      )}
    </div>
  )
}

