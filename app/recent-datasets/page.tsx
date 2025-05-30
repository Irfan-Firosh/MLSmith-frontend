"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Database, Search, Download, Trash2, Eye, Calendar, HardDrive, Filter, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

const datasets = [
  {
    id: "1",
    name: "customer_churn_data.csv",
    uploadDate: "2024-01-15",
    size: "2.4 MB",
    rows: 10000,
    columns: 15,
    type: "CSV",
    status: "processed",
    lastAccessed: "2 hours ago",
  },
  {
    id: "2",
    name: "sales_prediction_dataset.xlsx",
    uploadDate: "2024-01-14",
    size: "5.7 MB",
    rows: 25000,
    columns: 22,
    type: "Excel",
    status: "raw",
    lastAccessed: "1 day ago",
  },
  {
    id: "3",
    name: "image_features.json",
    uploadDate: "2024-01-12",
    size: "1.8 MB",
    rows: 5000,
    columns: 128,
    type: "JSON",
    status: "processed",
    lastAccessed: "3 days ago",
  },
  {
    id: "4",
    name: "financial_data.csv",
    uploadDate: "2024-01-10",
    size: "12.3 MB",
    rows: 50000,
    columns: 35,
    type: "CSV",
    status: "processing",
    lastAccessed: "5 days ago",
  },
  {
    id: "5",
    name: "user_behavior_logs.json",
    uploadDate: "2024-01-08",
    size: "8.9 MB",
    rows: 75000,
    columns: 18,
    type: "JSON",
    status: "processed",
    lastAccessed: "1 week ago",
  },
]

export default function RecentDatasetsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const { toast } = useToast()

  const filteredDatasets = datasets.filter((dataset) => {
    const matchesSearch = dataset.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || dataset.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleDownload = (dataset: any) => {
    toast({
      title: "Download started",
      description: `Downloading ${dataset.name}...`,
    })
  }

  const handleDelete = (dataset: any) => {
    toast({
      title: "Dataset deleted",
      description: `${dataset.name} has been removed.`,
      variant: "destructive",
    })
  }

  const handleViewDetails = (dataset: any) => {
    toast({
      title: "Opening dataset details",
      description: `Loading details for ${dataset.name}...`,
    })
  }

  return (
    <div className="flex-1 space-y-6 p-6 bg-black min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold text-white">Recent Datasets</h1>
            <p className="text-slate-400">Manage your uploaded datasets and data files</p>
          </div>
        </div>
        <Button className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-black font-semibold shadow-lg shadow-cyan-500/25">
          <Database className="mr-2 h-4 w-4" />
          Upload New Dataset
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Search datasets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-900/50 border-slate-800/50 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800/50">
              <Filter className="mr-2 h-4 w-4" />
              Filter: {filterStatus === "all" ? "All" : filterStatus}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-slate-900/90 border-slate-800/50 backdrop-blur-xl">
            <DropdownMenuItem
              onClick={() => setFilterStatus("all")}
              className="text-slate-300 hover:text-white hover:bg-slate-800/50"
            >
              All Datasets
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setFilterStatus("processed")}
              className="text-slate-300 hover:text-white hover:bg-slate-800/50"
            >
              Processed
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setFilterStatus("raw")}
              className="text-slate-300 hover:text-white hover:bg-slate-800/50"
            >
              Raw
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setFilterStatus("processing")}
              className="text-slate-300 hover:text-white hover:bg-slate-800/50"
            >
              Processing
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Datasets Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDatasets.map((dataset) => (
          <Card
            key={dataset.id}
            className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm hover:bg-slate-900/70 transition-all duration-200"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-lg flex items-center justify-center">
                    <Database className="w-5 h-5 text-black" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-white text-sm font-medium truncate">{dataset.name}</CardTitle>
                    <CardDescription className="text-slate-400 text-xs">{dataset.type} file</CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-slate-900/90 border-slate-800/50 backdrop-blur-xl">
                    <DropdownMenuItem
                      onClick={() => handleViewDetails(dataset)}
                      className="text-slate-300 hover:text-white hover:bg-slate-800/50"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDownload(dataset)}
                      className="text-slate-300 hover:text-white hover:bg-slate-800/50"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(dataset)}
                      className="text-red-400 hover:text-red-300 hover:bg-slate-800/50"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Badge
                className={
                  dataset.status === "processed"
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                    : dataset.status === "processing"
                      ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
                      : "bg-slate-500/20 text-slate-400 border-slate-500/30"
                }
              >
                {dataset.status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2 text-slate-400">
                  <Calendar className="h-4 w-4" />
                  <span>{dataset.uploadDate}</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-400">
                  <HardDrive className="h-4 w-4" />
                  <span>{dataset.size}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-400">Rows</p>
                  <p className="text-white font-medium">{dataset.rows.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-slate-400">Columns</p>
                  <p className="text-white font-medium">{dataset.columns}</p>
                </div>
              </div>
              <div className="text-xs text-slate-400">Last accessed: {dataset.lastAccessed}</div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewDetails(dataset)}
                  className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800/50"
                >
                  <Eye className="mr-1 h-3 w-3" />
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(dataset)}
                  className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800/50"
                >
                  <Download className="mr-1 h-3 w-3" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDatasets.length === 0 && (
        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Database className="h-12 w-12 text-slate-400 mb-4" />
            <h3 className="text-white text-lg font-medium mb-2">No datasets found</h3>
            <p className="text-slate-400 text-center mb-4">
              {searchTerm ? "Try adjusting your search terms" : "Upload your first dataset to get started"}
            </p>
            <Button className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-black font-semibold">
              Upload Dataset
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
