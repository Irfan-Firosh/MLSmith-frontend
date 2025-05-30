"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Download, Search, Calendar, FileText, Database, Filter, ExternalLink, Trash2, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

const exportHistory = [
  {
    id: "1",
    datasetName: "customer_churn_processed.csv",
    originalDataset: "customer_churn_data.csv",
    exportDate: "2024-01-15 14:30",
    format: "CSV",
    size: "2.8 MB",
    rows: 9847,
    columns: 23,
    pipeline: "Customer Churn Analysis Pipeline",
    downloadUrl: "#",
  },
  {
    id: "2",
    datasetName: "sales_forecast_features.json",
    originalDataset: "sales_data.xlsx",
    exportDate: "2024-01-14 09:15",
    format: "JSON",
    size: "4.2 MB",
    rows: 24750,
    columns: 18,
    pipeline: "Sales Forecasting Pipeline",
    downloadUrl: "#",
  },
  {
    id: "3",
    datasetName: "image_features_pca.csv",
    originalDataset: "image_features.json",
    exportDate: "2024-01-12 16:45",
    format: "CSV",
    size: "1.2 MB",
    rows: 5000,
    columns: 8,
    pipeline: "Image Classification Prep",
    downloadUrl: "#",
  },
  {
    id: "4",
    datasetName: "financial_risk_scaled.xlsx",
    originalDataset: "financial_data.csv",
    exportDate: "2024-01-10 11:20",
    format: "Excel",
    size: "8.9 MB",
    rows: 49823,
    columns: 42,
    pipeline: "Financial Risk Assessment",
    downloadUrl: "#",
  },
  {
    id: "5",
    datasetName: "user_behavior_encoded.json",
    originalDataset: "user_behavior_logs.json",
    exportDate: "2024-01-08 13:55",
    format: "JSON",
    size: "6.1 MB",
    rows: 74892,
    columns: 25,
    pipeline: "User Behavior Analysis",
    downloadUrl: "#",
  },
  {
    id: "6",
    datasetName: "marketing_campaign_clean.csv",
    originalDataset: "marketing_data.csv",
    exportDate: "2024-01-05 10:30",
    format: "CSV",
    size: "3.5 MB",
    rows: 15420,
    columns: 19,
    pipeline: "Marketing Campaign Analysis",
    downloadUrl: "#",
  },
]

export default function ExportHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterFormat, setFilterFormat] = useState("all")
  const { toast } = useToast()

  const filteredExports = exportHistory.filter((exportItem) => {
    const matchesSearch =
      exportItem.datasetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exportItem.originalDataset.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exportItem.pipeline.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterFormat === "all" || exportItem.format.toLowerCase() === filterFormat.toLowerCase()
    return matchesSearch && matchesFilter
  })

  const handleDownload = (exportItem: any) => {
    toast({
      title: "Download started",
      description: `Downloading ${exportItem.datasetName}...`,
    })
  }

  const handleDelete = (exportItem: any) => {
    toast({
      title: "Export deleted",
      description: `${exportItem.datasetName} has been removed from history.`,
      variant: "destructive",
    })
  }

  const handleViewDetails = (exportItem: any) => {
    toast({
      title: "Opening export details",
      description: `Loading details for ${exportItem.datasetName}...`,
    })
  }

  const getFormatColor = (format: string) => {
    switch (format.toLowerCase()) {
      case "csv":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "json":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
      case "excel":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  const getFormatIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case "csv":
      case "excel":
        return <FileText className="w-4 h-4" />
      case "json":
        return <Database className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  return (
    <div className="flex-1 space-y-6 p-6 bg-black min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold text-white">Export History</h1>
            <p className="text-slate-400">View and download your exported datasets</p>
          </div>
        </div>
        <div className="text-slate-400 text-sm">
          {filteredExports.length} of {exportHistory.length} exports
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Search exports by name, dataset, or pipeline..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-900/50 border-slate-800/50 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800/50">
              <Filter className="mr-2 h-4 w-4" />
              Format: {filterFormat === "all" ? "All" : filterFormat}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-slate-900/90 border-slate-800/50 backdrop-blur-xl">
            <DropdownMenuItem
              onClick={() => setFilterFormat("all")}
              className="text-slate-300 hover:text-white hover:bg-slate-800/50"
            >
              All Formats
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setFilterFormat("csv")}
              className="text-slate-300 hover:text-white hover:bg-slate-800/50"
            >
              CSV
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setFilterFormat("json")}
              className="text-slate-300 hover:text-white hover:bg-slate-800/50"
            >
              JSON
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setFilterFormat("excel")}
              className="text-slate-300 hover:text-white hover:bg-slate-800/50"
            >
              Excel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Export History Table */}
      <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Download className="mr-2 h-5 w-5 text-cyan-400" />
            Export History
          </CardTitle>
          <CardDescription className="text-slate-400">All your exported datasets and processed files</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredExports.map((exportItem) => (
              <div
                key={exportItem.id}
                className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:bg-slate-800/70 transition-all duration-200"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-lg flex items-center justify-center">
                    {getFormatIcon(exportItem.format)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="text-white font-medium truncate">{exportItem.datasetName}</h3>
                      <Badge className={getFormatColor(exportItem.format)}>{exportItem.format}</Badge>
                    </div>
                    <p className="text-slate-400 text-sm mb-1">
                      From: <span className="text-slate-300">{exportItem.originalDataset}</span>
                    </p>
                    <p className="text-slate-400 text-sm mb-2">
                      Pipeline: <span className="text-slate-300">{exportItem.pipeline}</span>
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-slate-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{exportItem.exportDate}</span>
                      </div>
                      <span>•</span>
                      <span>{exportItem.size}</span>
                      <span>•</span>
                      <span>{exportItem.rows.toLocaleString()} rows</span>
                      <span>•</span>
                      <span>{exportItem.columns} columns</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(exportItem)}
                    className="border-slate-700 text-slate-300 hover:bg-slate-800/50"
                  >
                    <Eye className="mr-1 h-3 w-3" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(exportItem)}
                    className="border-slate-700 text-slate-300 hover:bg-slate-800/50"
                  >
                    <Download className="mr-1 h-3 w-3" />
                    Download
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-slate-900/90 border-slate-800/50 backdrop-blur-xl">
                      <DropdownMenuItem
                        onClick={() => handleViewDetails(exportItem)}
                        className="text-slate-300 hover:text-white hover:bg-slate-800/50"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDownload(exportItem)}
                        className="text-slate-300 hover:text-white hover:bg-slate-800/50"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(exportItem)}
                        className="text-red-400 hover:text-red-300 hover:bg-slate-800/50"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {filteredExports.length === 0 && (
        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Download className="h-12 w-12 text-slate-400 mb-4" />
            <h3 className="text-white text-lg font-medium mb-2">No exports found</h3>
            <p className="text-slate-400 text-center mb-4">
              {searchTerm ? "Try adjusting your search terms" : "Process and export your first dataset to see it here"}
            </p>
            <Button className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-black font-semibold">
              Start New Project
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Download className="h-4 w-4 text-cyan-400" />
              <span className="text-slate-400 text-sm">Total Exports</span>
            </div>
            <p className="text-white text-2xl font-bold mt-1">{exportHistory.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Database className="h-4 w-4 text-emerald-400" />
              <span className="text-slate-400 text-sm">Total Size</span>
            </div>
            <p className="text-white text-2xl font-bold mt-1">26.7 MB</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-blue-400" />
              <span className="text-slate-400 text-sm">CSV Files</span>
            </div>
            <p className="text-white text-2xl font-bold mt-1">3</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-purple-400" />
              <span className="text-slate-400 text-sm">This Month</span>
            </div>
            <p className="text-white text-2xl font-bold mt-1">6</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
