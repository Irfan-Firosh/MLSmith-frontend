"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Database, Zap, Brain, BarChart3, Rocket, ArrowRight } from "lucide-react"

const workflowSteps = [
  {
    id: 1,
    title: "Data Upload",
    description: "CSV, Excel, JSON",
    icon: Database,
    color: "from-cyan-400 to-cyan-600",
    delay: 0,
  },
  {
    id: 2,
    title: "Preprocessing",
    description: "Clean & Transform",
    icon: Zap,
    color: "from-emerald-400 to-emerald-600",
    delay: 1000,
  },
  {
    id: 3,
    title: "Model Training",
    description: "Multiple Algorithms",
    icon: Brain,
    color: "from-blue-400 to-blue-600",
    delay: 2000,
  },
  {
    id: 4,
    title: "Evaluation",
    description: "Performance Metrics",
    icon: BarChart3,
    color: "from-purple-400 to-purple-600",
    delay: 3000,
  },
  {
    id: 5,
    title: "Deployment",
    description: "Production API",
    icon: Rocket,
    color: "from-pink-400 to-pink-600",
    delay: 4000,
  },
]

export function WorkflowVisualization() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % workflowSteps.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-emerald-500/5 to-blue-500/5 rounded-3xl blur-3xl" />

      <div className="relative bg-slate-900/20 backdrop-blur-sm border border-slate-800/50 rounded-3xl p-8">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-6">
          {workflowSteps.map((step, index) => {
            const Icon = step.icon
            const isActive = index === activeStep
            const isPast = index < activeStep

            return (
              <div key={step.id} className="flex flex-col items-center space-y-4 relative">
                {/* Step Card */}
                <Card
                  className={`
                    relative p-6 transition-all duration-700 border-2 min-w-[200px]
                    ${
                      isActive
                        ? "bg-slate-800/80 border-cyan-400 shadow-2xl shadow-cyan-400/25 scale-105"
                        : isPast
                          ? "bg-slate-800/60 border-slate-600"
                          : "bg-slate-900/40 border-slate-700"
                    }
                  `}
                >
                  {/* Animated background for active step */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-lg animate-pulse" />
                  )}

                  <div className="relative flex flex-col items-center space-y-3">
                    {/* Icon */}
                    <div
                      className={`
                        w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-700
                        ${
                          isActive
                            ? `bg-gradient-to-br ${step.color} shadow-2xl shadow-cyan-400/50 scale-110`
                            : isPast
                              ? `bg-gradient-to-br ${step.color} opacity-80`
                              : "bg-slate-700"
                        }
                      `}
                    >
                      <Icon className={`w-8 h-8 ${isActive || isPast ? "text-black" : "text-slate-400"}`} />
                    </div>

                    {/* Step number */}
                    <div
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-700
                        ${
                          isActive
                            ? "bg-cyan-400 text-black shadow-lg shadow-cyan-400/50"
                            : isPast
                              ? "bg-slate-600 text-white"
                              : "bg-slate-700 text-slate-400"
                        }
                      `}
                    >
                      {step.id}
                    </div>

                    {/* Title and description */}
                    <div className="text-center">
                      <h3
                        className={`font-semibold transition-colors duration-700 ${
                          isActive ? "text-white" : "text-slate-300"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`text-sm transition-colors duration-700 ${
                          isActive ? "text-slate-300" : "text-slate-400"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Arrow connector (hidden on last step) */}
                {index < workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-full ml-4 z-10">
                    <ArrowRight
                      className={`
                        w-6 h-6 transition-all duration-700
                        ${index < activeStep ? "text-cyan-400 scale-110" : "text-slate-600"}
                      `}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Progress bar */}
        <div className="mt-8 w-full bg-slate-800/50 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-cyan-400 to-emerald-500 h-2 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-cyan-400/50"
            style={{ width: `${((activeStep + 1) / workflowSteps.length) * 100}%` }}
          />
        </div>

        {/* Status text */}
        <div className="mt-4 text-center">
          <p className="text-slate-300">
            <span className="text-cyan-400 font-semibold">Step {activeStep + 1}:</span>{" "}
            {workflowSteps[activeStep].title}
          </p>
        </div>
      </div>
    </div>
  )
}
