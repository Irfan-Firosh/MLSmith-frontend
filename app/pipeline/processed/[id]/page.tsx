import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Download, Code, CheckCircle, BarChart3, Database, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock data for the preprocessing result
const preprocessingData = {
  id: "processed-123",
  name: "Customer Data Preprocessing",
  status: "completed",
  originalRows: 10000,
  processedRows: 9847,
  originalColumns: 15,
  processedColumns: 23,
  missingValuesHandled: 153,
  duplicatesRemoved: 47,
  outliersDetected: 23,
  encodedFeatures: 8,
}

const sampleProcessedData = [
  { id: 1, age_scaled: 0.234, income_scaled: -1.456, category_encoded: 1, satisfaction_score: 0.789 },
  { id: 2, age_scaled: -0.567, income_scaled: 0.891, category_encoded: 0, satisfaction_score: -0.234 },
  { id: 3, age_scaled: 1.789, income_scaled: -0.234, category_encoded: 1, satisfaction_score: 0.567 },
  { id: 4, age_scaled: -1.234, income_scaled: 1.567, category_encoded: 0, satisfaction_score: -0.789 },
  { id: 5, age_scaled: 0.891, income_scaled: -2.345, category_encoded: 1, satisfaction_score: 1.456 },
]

export default function PreprocessingResultPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <SidebarTrigger />
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">{preprocessingData.name}</h2>
            <p className="text-slate-400">Preprocessing completed successfully</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            <CheckCircle className="mr-1 h-3 w-3" />
            {preprocessingData.status}
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
            <div className="text-2xl font-bold text-white">{preprocessingData.processedRows.toLocaleString()}</div>
            <p className="text-xs text-slate-400">
              {preprocessingData.originalRows - preprocessingData.processedRows} rows removed
            </p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Features Created</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{preprocessingData.processedColumns}</div>
            <p className="text-xs text-slate-400">
              +{preprocessingData.processedColumns - preprocessingData.originalColumns} from encoding
            </p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Missing Values</CardTitle>
            <CheckCircle className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{preprocessingData.missingValuesHandled}</div>
            <p className="text-xs text-slate-400">Values handled</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Data Quality</CardTitle>
            <Database className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{preprocessingData.duplicatesRemoved}</div>
            <p className="text-xs text-slate-400">Duplicates removed</p>
          </CardContent>
        </Card>
      </div>

      {/* Processed Data Preview */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Preprocessed Data Preview</CardTitle>
              <CardDescription className="text-slate-400">
                First 5 rows of your cleaned and transformed dataset
              </CardDescription>
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
                  <th className="text-left p-2 text-slate-300">Age (Scaled)</th>
                  <th className="text-left p-2 text-slate-300">Income (Scaled)</th>
                  <th className="text-left p-2 text-slate-300">Category (Encoded)</th>
                  <th className="text-left p-2 text-slate-300">Satisfaction Score</th>
                </tr>
              </thead>
              <tbody>
                {sampleProcessedData.map((row) => (
                  <tr key={row.id} className="border-b border-slate-800">
                    <td className="p-2 text-white">{row.id}</td>
                    <td className="p-2 text-slate-300">{row.age_scaled.toFixed(3)}</td>
                    <td className="p-2 text-slate-300">{row.income_scaled.toFixed(3)}</td>
                    <td className="p-2 text-slate-300">{row.category_encoded}</td>
                    <td className="p-2 text-slate-300">{row.satisfaction_score.toFixed(3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-center">
            <p className="text-slate-400 text-sm">
              Showing 5 of {preprocessingData.processedRows.toLocaleString()} rows
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Preprocessing Steps */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Preprocessing Steps Applied</CardTitle>
          <CardDescription className="text-slate-400">Summary of data transformation steps completed</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-slate-900/50 rounded-lg">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium">Data Cleaning</h3>
                <p className="text-slate-400 text-sm">
                  Removed {preprocessingData.duplicatesRemoved} duplicates and handled{" "}
                  {preprocessingData.missingValuesHandled} missing values
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-slate-900/50 rounded-lg">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium">Feature Encoding</h3>
                <p className="text-slate-400 text-sm">
                  Applied one-hot encoding to {preprocessingData.encodedFeatures} categorical features
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-slate-900/50 rounded-lg">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium">Feature Scaling</h3>
                <p className="text-slate-400 text-sm">Standardized numerical features to zero mean and unit variance</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-slate-900/50 rounded-lg">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium">Outlier Detection</h3>
                <p className="text-slate-400 text-sm">
                  Identified and flagged {preprocessingData.outliersDetected} potential outliers for review
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
            <ArrowLeft className="mr-2 h-4 w-4" />
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
