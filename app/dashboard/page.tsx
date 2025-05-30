import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Plus, Database, GitBranch, TrendingUp, Download, Clock, ListChecks } from "lucide-react"
import Link from "next/link"

const recentPipelines = [
  {
    id: "1",
    name: "Customer Churn Analysis",
    dataset: "customer_data.csv",
    status: "completed",
    createdAt: "2 hours ago",
    steps: ["Missing Values", "One-Hot Encoding", "Standard Scaling", "PCA"],
    rows: 10000,
    originalColumns: 15,
    processedColumns: 23,
  },
  {
    id: "2",
    name: "Sales Prediction Prep",
    dataset: "sales_data.xlsx",
    status: "processing",
    createdAt: "1 day ago",
    steps: ["Missing Values", "Label Encoding", "MinMax Scaling"],
    rows: 25000,
    originalColumns: 22,
    processedColumns: 18,
  },
  {
    id: "3",
    name: "Image Features Processing",
    dataset: "image_features.json",
    status: "completed",
    createdAt: "3 days ago",
    steps: ["Normalization", "PCA", "Feature Selection"],
    rows: 5000,
    originalColumns: 128,
    processedColumns: 8,
  },
]

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-6 p-6 bg-black min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold text-white">Welcome back, John</h1>
            <p className="text-slate-400">Here's what's happening with your data preprocessing projects</p>
          </div>
        </div>
        <Link href="/new-project">
          <Button className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-black font-semibold shadow-lg shadow-cyan-500/25">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Total Preprocessing Jobs</CardTitle>
            <Database className="h-4 w-4 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">12</div>
            <p className="text-xs text-slate-400">+2 from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Active Processing</CardTitle>
            <GitBranch className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">3</div>
            <p className="text-xs text-slate-400">Currently processing</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Datasets Cleaned</CardTitle>
            <Download className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">8</div>
            <p className="text-xs text-slate-400">Ready for export</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Avg Processing Time</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">2.4m</div>
            <p className="text-xs text-slate-400">Per pipeline</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Projects */}
      <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Recent Preprocessing Jobs</CardTitle>
          <CardDescription className="text-slate-400">Your latest data preprocessing workflows</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPipelines.map((pipeline) => (
              <div
                key={pipeline.id}
                className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/50 transition-all duration-200"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-medium text-white">{pipeline.name}</h3>
                    <Badge
                      variant={pipeline.status === "completed" ? "default" : "secondary"}
                      className={
                        pipeline.status === "completed"
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                          : "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
                      }
                    >
                      {pipeline.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-400 mb-2">{pipeline.dataset}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {pipeline.steps.map((step, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-slate-600 text-slate-300">
                        {step}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-xs text-slate-400">
                    {pipeline.rows.toLocaleString()} rows • {pipeline.originalColumns} → {pipeline.processedColumns}{" "}
                    columns
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-400 mb-2">{pipeline.createdAt}</p>
                  <div className="flex space-x-2">
                    <Link href={`/pipeline/${pipeline.id}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-cyan-400 hover:text-cyan-300 hover:bg-slate-800/50"
                      >
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/new-project">
          <Card className="bg-slate-900/30 border-slate-800/50 hover:bg-slate-900/50 transition-all duration-200 cursor-pointer group hover:border-cyan-400/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center group-hover:text-cyan-400 transition-colors">
                <Plus className="mr-2 h-5 w-5" />
                Start New Project
              </CardTitle>
              <CardDescription className="text-slate-400">Upload your dataset and begin preprocessing</CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Card className="bg-slate-900/30 border-slate-800/50 opacity-60 cursor-not-allowed">
          <CardHeader>
            <CardTitle className="text-slate-500 flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              View Processing History
              <Badge variant="outline" className="ml-auto border-slate-600 text-slate-500 text-xs">
                Coming Soon
              </Badge>
            </CardTitle>
            <CardDescription className="text-slate-500">Track the progress of your preprocessing jobs</CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-slate-900/30 border-slate-800/50 opacity-60 cursor-not-allowed">
          <CardHeader>
            <CardTitle className="text-slate-500 flex items-center">
              <ListChecks className="mr-2 h-5 w-5" />
              Advanced Preprocessing
              <Badge variant="outline" className="ml-auto border-slate-600 text-slate-500 text-xs">
                Coming Soon
              </Badge>
            </CardTitle>
            <CardDescription className="text-slate-500">
              Customize your preprocessing pipeline with advanced options
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
