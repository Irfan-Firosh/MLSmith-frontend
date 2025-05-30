import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Download, Code, CheckCircle, BarChart3, Database } from "lucide-react"
import Link from "next/link"

// Mock data for the pipeline result
const pipelineData = {
  id: "pipeline-123",
  name: "Customer Churn Analysis",
  status: "completed",
  originalRows: 10000,
  processedRows: 9847,
  originalColumns: 15,
  processedColumns: 23,
  missingValuesHandled: 153,
  pcaComponents: 8,
  varianceRetained: 95.2,
}

const sampleData = [
  { id: 1, feature_1: 0.234, feature_2: -1.456, feature_3: 2.789, pca_1: 1.234, pca_2: -0.567 },
  { id: 2, feature_1: -0.567, feature_2: 0.891, feature_3: -1.234, pca_1: -0.789, pca_2: 1.456 },
  { id: 3, feature_1: 1.789, feature_2: -0.234, feature_3: 0.567, pca_1: 0.345, pca_2: -1.234 },
  { id: 4, feature_1: -1.234, feature_2: 1.567, feature_3: -0.789, pca_1: -1.567, pca_2: 0.891 },
  { id: 5, feature_1: 0.891, feature_2: -2.345, feature_3: 1.456, pca_1: 2.123, pca_2: -0.345 },
]

export default function PipelineResultPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <SidebarTrigger />
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">{pipelineData.name}</h2>
            <p className="text-slate-400">Pipeline ID: {params.id}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            <CheckCircle className="mr-1 h-3 w-3" />
            {pipelineData.status}
          </Badge>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Rows Processed</CardTitle>
            <Database className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{pipelineData.processedRows.toLocaleString()}</div>
            <p className="text-xs text-slate-400">
              {pipelineData.originalRows - pipelineData.processedRows} rows removed
            </p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Features After PCA</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{pipelineData.pcaComponents}</div>
            <p className="text-xs text-slate-400">{pipelineData.varianceRetained}% variance retained</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Missing Values</CardTitle>
            <CheckCircle className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{pipelineData.missingValuesHandled}</div>
            <p className="text-xs text-slate-400">Values imputed</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Total Features</CardTitle>
            <Database className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{pipelineData.processedColumns}</div>
            <p className="text-xs text-slate-400">
              +{pipelineData.processedColumns - pipelineData.originalColumns} from encoding
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Processed Data Preview */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Processed Data Preview</CardTitle>
              <CardDescription className="text-slate-400">First 5 rows of your preprocessed dataset</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" className="border-slate-600 text-slate-300">
                <Code className="mr-2 h-4 w-4" />
                View Code
              </Button>
              <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                <Download className="mr-2 h-4 w-4" />
                Download CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left p-2 text-slate-300">ID</th>
                  <th className="text-left p-2 text-slate-300">Feature 1</th>
                  <th className="text-left p-2 text-slate-300">Feature 2</th>
                  <th className="text-left p-2 text-slate-300">Feature 3</th>
                  <th className="text-left p-2 text-slate-300">PCA 1</th>
                  <th className="text-left p-2 text-slate-300">PCA 2</th>
                </tr>
              </thead>
              <tbody>
                {sampleData.map((row) => (
                  <tr key={row.id} className="border-b border-slate-800">
                    <td className="p-2 text-white">{row.id}</td>
                    <td className="p-2 text-slate-300">{row.feature_1.toFixed(3)}</td>
                    <td className="p-2 text-slate-300">{row.feature_2.toFixed(3)}</td>
                    <td className="p-2 text-slate-300">{row.feature_3.toFixed(3)}</td>
                    <td className="p-2 text-slate-300">{row.pca_1.toFixed(3)}</td>
                    <td className="p-2 text-slate-300">{row.pca_2.toFixed(3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-center">
            <p className="text-slate-400 text-sm">Showing 5 of {pipelineData.processedRows.toLocaleString()} rows</p>
          </div>
        </CardContent>
      </Card>

      {/* Pipeline Steps */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Pipeline Steps Executed</CardTitle>
          <CardDescription className="text-slate-400">
            Summary of preprocessing steps applied to your data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-slate-900/50 rounded-lg">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium">Missing Value Imputation</h3>
                <p className="text-slate-400 text-sm">
                  Filled {pipelineData.missingValuesHandled} missing values using mean strategy
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-slate-900/50 rounded-lg">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium">One-Hot Encoding</h3>
                <p className="text-slate-400 text-sm">
                  Encoded categorical variables, added {pipelineData.processedColumns - pipelineData.originalColumns}{" "}
                  new features
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-slate-900/50 rounded-lg">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium">Standard Scaling</h3>
                <p className="text-slate-400 text-sm">
                  Normalized all numerical features to zero mean and unit variance
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-slate-900/50 rounded-lg">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium">Principal Component Analysis</h3>
                <p className="text-slate-400 text-sm">
                  Reduced to {pipelineData.pcaComponents} components, retaining {pipelineData.varianceRetained}% of
                  variance
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-center space-x-4">
        <Link href="/new-project">
          <Button variant="outline" className="border-slate-600 text-slate-300">
            Start New Project
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}
