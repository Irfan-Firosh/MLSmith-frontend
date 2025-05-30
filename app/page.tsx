import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Zap, Database, Brain, Rocket, BarChart3, Star } from "lucide-react"
import Link from "next/link"
import { WorkflowVisualization } from "@/components/workflow-visualization"
import { AnimatedBackground } from "@/components/animated-background"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <AnimatedBackground />

      {/* Navigation */}
      <nav className="border-b border-slate-800/50 backdrop-blur-sm bg-black/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-400/25">
                <Zap className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold text-white">ML Smith</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800/50">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-black font-semibold shadow-lg shadow-cyan-500/25">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-slate-900/50 text-cyan-400 border-cyan-400/20 hover:bg-slate-800/50 backdrop-blur-sm">
            ✨ Complete ML Platform
          </Badge>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            Automate Your
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-500 bg-clip-text text-transparent">
              ML Workflow
            </span>
            <br />
            End-to-End
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            ML Smith streamlines your entire machine learning pipeline, from data preprocessing and model training to
            deployment, all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-black font-semibold text-lg px-8 py-6 shadow-lg shadow-cyan-500/25"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button
                size="lg"
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800/50 hover:border-cyan-400/50 text-lg px-8 py-6 backdrop-blur-sm"
              >
                Try Demo
              </Button>
            </Link>
          </div>

          {/* Workflow Visualization */}
          <WorkflowVisualization />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Complete ML Pipeline</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Everything you need for machine learning, from raw data to production deployment
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-slate-900/30 border-slate-800/50 hover:bg-slate-900/50 transition-all duration-300 group hover:border-cyan-400/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-400/25">
                  <Database className="w-6 h-6 text-black" />
                </div>
                <CardTitle className="text-white">Load & Preprocess Data</CardTitle>
                <CardDescription className="text-slate-400">
                  Upload CSV, Excel, JSON files and automatically clean, transform, and prepare your data
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-slate-900/30 border-slate-800/50 hover:bg-slate-900/50 transition-all duration-300 group hover:border-emerald-400/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-400/25">
                  <Brain className="w-6 h-6 text-black" />
                </div>
                <CardTitle className="text-white">Model Training & Evaluation</CardTitle>
                <CardDescription className="text-slate-400">
                  Train multiple algorithms simultaneously and compare performance with detailed metrics
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-slate-900/30 border-slate-800/50 hover:bg-slate-900/50 transition-all duration-300 group hover:border-blue-400/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-blue-400/25">
                  <Rocket className="w-6 h-6 text-black" />
                </div>
                <CardTitle className="text-white">Deployment & Monitoring</CardTitle>
                <CardDescription className="text-slate-400">
                  Deploy models as APIs with real-time monitoring and performance tracking
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-slate-900/30 border-slate-800/50 hover:bg-slate-900/50 transition-all duration-300 group hover:border-purple-400/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-purple-400/25">
                  <BarChart3 className="w-6 h-6 text-black" />
                </div>
                <CardTitle className="text-white">Automated Pipelines</CardTitle>
                <CardDescription className="text-slate-400">
                  Create reusable ML pipelines with automated hyperparameter tuning and optimization
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Trusted by ML Teams</h2>
            <p className="text-xl text-slate-300">Join thousands of data scientists and ML engineers</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-900/30 border-slate-800/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 mb-4">
                  "ML Smith reduced our model development time from weeks to days. The automated pipeline is incredible
                  and the deployment features are game-changing."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-emerald-500 rounded-full flex items-center justify-center text-black font-bold">
                    S
                  </div>
                  <div className="ml-3">
                    <p className="text-white font-medium">Sarah Chen</p>
                    <p className="text-slate-400 text-sm">ML Engineer at TechCorp</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/30 border-slate-800/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 mb-4">
                  "From prototype to production in hours, not months. The intuitive interface and powerful automation
                  make complex ML workflows effortless."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-black font-bold">
                    M
                  </div>
                  <div className="ml-3">
                    <p className="text-white font-medium">Marcus Rodriguez</p>
                    <p className="text-slate-400 text-sm">Data Scientist at StartupXYZ</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/30 border-slate-800/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 mb-4">
                  "The automated model selection and hyperparameter tuning saved us countless hours. Finally, a tool
                  that understands ML workflows."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-black font-bold">
                    A
                  </div>
                  <div className="ml-3">
                    <p className="text-white font-medium">Aisha Patel</p>
                    <p className="text-slate-400 text-sm">Research Scientist at AI Labs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-400/25">
                  <Zap className="w-5 h-5 text-black" />
                </div>
                <span className="text-xl font-bold text-white">ML Smith</span>
              </div>
              <p className="text-slate-400">Complete ML workflow automation platform for modern data teams.</p>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">Product</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/features" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="hover:text-white transition-colors">
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="hover:text-white transition-colors">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="/compliance" className="hover:text-white transition-colors">
                    Compliance
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800/50 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 ML Smith. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
