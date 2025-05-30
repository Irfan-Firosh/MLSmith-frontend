"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import {
  GitBranch,
  Search,
  Play,
  Pause,
  Trash2,
  Eye,
  Edit,
  Calendar,
  Clock,
  Filter,
  MoreHorizontal,
  Plus,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

const pipelines = [
  {
    id: "1",
    name: "Customer Churn Analysis Pipeline",
    description: "Complete preprocessing pipeline for customer churn prediction",
    status: "completed",
    createdDate: "2024-01-15",
    lastRun: "2 hours ago",
    duration: "3m 45s",
    dataset: "customer_churn_data.csv",
    steps: ["Missing Values", "One-Hot Encoding", "Standard Scaling", "PCA"],
    accuracy: 94.2,
    runs: 12,
  },
  {
    id: "2",
    name: "Sales Forecasting Pipeline",
    description: "Time series preprocessing for sales prediction models",
    status: "running",
    createdDate: "2024-01-14",
    lastRun: "Running now",
    duration: "1m 23s",
    dataset: "sales_data.xlsx",
    steps: ["Missing Values", "Label Encoding", "MinMax Scaling"],
    accuracy: null,
    runs: 5,
  },
  {
    id: "3",
    name: "Image Classification Prep",
    description: "Feature extraction and preprocessing for image data",
    status: "failed",
    createdDate: "2024-01-12",
    lastRun: "3 days ago",
    duration: "Failed at 2m 15s",
    dataset: "image_features.json",
    steps: ["Normalization", "PCA", "Feature Selection"],
    accuracy: null,
    runs: 8,
  },
  {
    id: "4",
    name: "Financial Risk Assessment",
    description: "Comprehensive preprocessing for financial risk models",
    status: "completed",
    createdDate: "2024-01-10",
    lastRun: "5 days ago",
    duration: "5m 12s",
    dataset: "financial_data.csv",
    steps: ["Missing Values", "Outlier Detection", "Standard Scaling", "Feature Selection"],
    accuracy: 89.7,
    runs: 15,
  },
  {
    id: "5",
    name: "User Behavior Analysis",
    description: "Preprocessing pipeline for user behavior prediction",
    status: "paused",
    createdDate: "2024-01-08",
    lastRun: "1 week ago",
    duration: "2m 58s",
    dataset: "user_behavior_logs.json",
    steps: ["Data Cleaning", "Feature Engineering", "Normalization"],
    accuracy: 92.1,
    runs: 7,
  },
]

export default function PipelinesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const { toast } = useToast()

  const filteredPipelines = pipelines.filter((pipeline) => {
    const matchesSearch = pipeline.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || pipeline.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleRunPipeline = (pipeline: any) => {
    toast({
      title: "Pipeline started",
      description: `${pipeline.name} is now running...`,
    })
  }

  const handlePausePipeline = (pipeline: any) => {
    toast({
      title: "Pipeline paused",
      description: `${pipeline.name} has been paused.`,
    })
  }

  const handleDeletePipeline = (pipeline: any) => {
    toast({
      title: "Pipeline deleted",
      description: `${pipeline.name} has been removed.`,
      variant: "destructive",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "running":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
      case "failed":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "paused":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  return (
    <div className="flex-1 space-y-6 p-6 bg-black min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold text-white">ML Pipelines</h1>
            <p className="text-slate-400">Manage your preprocessing and ML pipelines</p>
          </div>
        </div>
        <Link href="/new-project">
          <Button className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-black font-semibold shadow-lg shadow-cyan-500/25">
            <Plus className="mr-2 h-4 w-4" />
            Create Pipeline
          </Button>
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Search pipelines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-900/50 border-slate-800/50 text-white focus:border-cyan-400 focus:ring-cyan-400/20"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800/50">
              <Filter className="mr-2 h-4 w-4" />
              Status: {filterStatus === "all" ? "All" : filterStatus}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-slate-900/90 border-slate-800/50 backdrop-blur-xl">
            <DropdownMenuItem
              onClick={() => setFilterStatus("all")}
              className="text-slate-300 hover:text-white hover:bg-slate-800/50"
            >
              All Pipelines
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setFilterStatus("completed")}
              className="text-slate-300 hover:text-white hover:bg-slate-800/50"
            >
              Completed
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setFilterStatus("running")}
              className="text-slate-300 hover:text-white hover:bg-slate-800/50"
            >
              Running
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setFilterStatus("failed")}
              className="text-slate-300 hover:text-white hover:bg-slate-800/50"
            >
              Failed
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setFilterStatus("paused")}
              className="text-slate-300 hover:text-white hover:bg-slate-800/50"
            >
              Paused
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Pipelines List */}
      <div className="space-y-4">
        {filteredPipelines.map((pipeline) => (
          <Card
            key={pipeline.id}
            className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm hover:bg-slate-900/70 transition-all duration-200"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-lg flex items-center justify-center">
                    <GitBranch className="w-6 h-6 text-black" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="text-white text-lg">{pipeline.name}</CardTitle>
                      <Badge className={getStatusColor(pipeline.status)}>{pipeline.status}</Badge>
                      {pipeline.accuracy && (
                        <Badge variant="outline" className="border-slate-600 text-slate-300">
                          {pipeline.accuracy}% accuracy
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-slate-400 mb-3">{pipeline.description}</CardDescription>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {pipeline.steps.map((step, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-slate-600 text-slate-300">
                          {step}
                        </Badge>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>Created {pipeline.createdDate}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>Last run: {pipeline.lastRun}</span>
                      </div>
                      <div>
                        <span>Duration: {pipeline.duration}</span>
                      </div>
                      <div>
                        <span>Runs: {pipeline.runs}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-slate-900/90 border-slate-800/50 backdrop-blur-xl">
                    <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-800/50">
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-800/50">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Pipeline
                    </DropdownMenuItem>
                    {pipeline.status === "running" ? (
                      <DropdownMenuItem
                        onClick={() => handlePausePipeline(pipeline)}
                        className="text-slate-300 hover:text-white hover:bg-slate-800/50"
                      >
                        <Pause className="mr-2 h-4 w-4" />
                        Pause
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem
                        onClick={() => handleRunPipeline(pipeline)}
                        className="text-slate-300 hover:text-white hover:bg-slate-800/50"
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Run Pipeline
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={() => handleDeletePipeline(pipeline)}
                      className="text-red-400 hover:text-red-300 hover:bg-slate-800/50"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-400">
                  Dataset: <span className="text-white">{pipeline.dataset}</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800/50">
                    <Eye className="mr-1 h-3 w-3" />
                    View
                  </Button>
                  {pipeline.status === "running" ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePausePipeline(pipeline)}
                      className="border-slate-700 text-slate-300 hover:bg-slate-800/50"
                    >
                      <Pause className="mr-1 h-3 w-3" />
                      Pause
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRunPipeline(pipeline)}
                      className="border-slate-700 text-slate-300 hover:bg-slate-800/50"
                    >
                      <Play className="mr-1 h-3 w-3" />
                      Run
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPipelines.length === 0 && (
        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <GitBranch className="h-12 w-12 text-slate-400 mb-4" />
            <h3 className="text-white text-lg font-medium mb-2">No pipelines found</h3>
            <p className="text-slate-400 text-center mb-4">
              {searchTerm ? "Try adjusting your search terms" : "Create your first ML pipeline to get started"}
            </p>
            <Link href="/new-project">
              <Button className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-black font-semibold">
                Create Pipeline
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
