interface ProcessingConfig {
  missingValues: string
  encoding: string[]
  scaling: string[]
  pca: { variance: number } | null
  targetColumn: string
  duplicateHandling: "remove" | "keep_first" | "keep_last" | null
  outlierDetection: boolean
  outlierMethod: "iqr" | "zscore" | "isolation_forest" | null
  featureSelection: boolean
  selectionMethod: "variance" | "correlation" | "mutual_info" | null
}

export async function processDataset(data: any[], config: ProcessingConfig): Promise<any> {
  console.log("Starting data processing...")

  // Validate data
  const validationResult = validateData(data)
  if (!validationResult.isValid) {
    console.error("Data validation failed:", validationResult.errors)
    throw new Error(`Data validation failed: ${validationResult.errors.join(", ")}`)
  }
  console.log("Data validation successful.")

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 2000))
  console.log("Initial delay complete.")

  let processedData = [...data]

  // Handle duplicate values
  if (config.duplicateHandling === "remove") {
    processedData = removeDuplicates(processedData)
    console.log("Duplicates removed.")
  } else if (config.duplicateHandling === "keep_first") {
    processedData = removeDuplicates(processedData, "keep_first")
    console.log("First duplicate kept.")
  } else if (config.duplicateHandling === "keep_last") {
    processedData = removeDuplicates(processedData, "keep_last")
    console.log("Last duplicate kept.")
  }

  // Handle missing values
  if (config.missingValues === "mean") {
    processedData = fillMissingWithMean(processedData)
    console.log("Missing values filled with mean.")
  } else if (config.missingValues === "median") {
    processedData = fillMissingWithMedian(processedData)
    console.log("Missing values filled with median.")
  } else if (config.missingValues === "drop") {
    processedData = dropMissingRows(processedData)
    console.log("Rows with missing values dropped.")
  }

  // Detect and handle outliers
  if (config.outlierDetection && config.outlierMethod) {
    processedData = detectOutliers(processedData, config.outlierMethod)
    console.log(`Outliers detected and handled using ${config.outlierMethod} method.`)
  }

  // Apply encoding
  if (config.encoding.includes("onehot")) {
    processedData = applyOneHotEncoding(processedData, config.targetColumn)
    console.log("One-hot encoding applied.")
  }
  if (config.encoding.includes("label")) {
    processedData = applyLabelEncoding(processedData, config.targetColumn)
    console.log("Label encoding applied.")
  }

  // Apply scaling
  if (config.scaling.includes("standard")) {
    processedData = applyStandardScaling(processedData, config.targetColumn)
    console.log("Standard scaling applied.")
  }
  if (config.scaling.includes("minmax")) {
    processedData = applyMinMaxScaling(processedData, config.targetColumn)
    console.log("Min-max scaling applied.")
  }

  // Apply PCA if requested
  if (config.pca) {
    processedData = applyPCA(processedData, config.targetColumn, config.pca.variance)
    console.log(`PCA applied with variance retention of ${config.pca.variance}%.`)
  }

  // Apply feature selection
  if (config.featureSelection && config.selectionMethod) {
    processedData = selectFeatures(processedData, config.targetColumn, config.selectionMethod)
    console.log(`Feature selection applied using ${config.selectionMethod} method.`)
  }

  console.log("Data processing complete.")

  const dataQualityMetrics = calculateDataQualityMetrics(data)

  return {
    processedData,
    dataQualityMetrics,
  }
}

function fillMissingWithMean(data: any[]): any[] {
  const columns = Object.keys(data[0])
  const means: { [key: string]: number } = {}

  // Calculate means for numeric columns
  columns.forEach((col) => {
    const numericValues = data.map((row) => row[col]).filter((val) => typeof val === "number" && !isNaN(val))

    if (numericValues.length > 0) {
      means[col] = numericValues.reduce((sum, val) => sum + val, 0) / numericValues.length
    }
  })

  // Fill missing values
  return data.map((row) => {
    const newRow = { ...row }
    columns.forEach((col) => {
      if ((row[col] === null || row[col] === undefined || row[col] === "") && means[col]) {
        newRow[col] = means[col]
      }
    })
    return newRow
  })
}

function fillMissingWithMedian(data: any[]): any[] {
  const columns = Object.keys(data[0])
  const medians: { [key: string]: number } = {}

  // Calculate medians for numeric columns
  columns.forEach((col) => {
    const numericValues = data
      .map((row) => row[col])
      .filter((val) => typeof val === "number" && !isNaN(val))
      .sort((a, b) => a - b)

    if (numericValues.length > 0) {
      const mid = Math.floor(numericValues.length / 2)
      medians[col] =
        numericValues.length % 2 === 0 ? (numericValues[mid - 1] + numericValues[mid]) / 2 : numericValues[mid]
    }
  })

  // Fill missing values
  return data.map((row) => {
    const newRow = { ...row }
    columns.forEach((col) => {
      if ((row[col] === null || row[col] === undefined || row[col] === "") && medians[col]) {
        newRow[col] = medians[col]
      }
    })
    return newRow
  })
}

function dropMissingRows(data: any[]): any[] {
  return data.filter((row) => {
    return Object.values(row).every((val) => val !== null && val !== undefined && val !== "")
  })
}

function applyOneHotEncoding(data: any[], targetColumn: string): any[] {
  const columns = Object.keys(data[0])
  const categoricalColumns = columns.filter(
    (col) => col !== targetColumn && data.some((row) => typeof row[col] === "string"),
  )

  let processedData = [...data]

  categoricalColumns.forEach((col) => {
    const uniqueValues = [...new Set(data.map((row) => row[col]))]

    processedData = processedData.map((row) => {
      const newRow = { ...row }
      uniqueValues.forEach((value) => {
        newRow[`${col}_${value}`] = row[col] === value ? 1 : 0
      })
      delete newRow[col]
      return newRow
    })
  })

  return processedData
}

function applyLabelEncoding(data: any[], targetColumn: string): any[] {
  const columns = Object.keys(data[0])
  const categoricalColumns = columns.filter(
    (col) => col !== targetColumn && data.some((row) => typeof row[col] === "string"),
  )

  let processedData = [...data]

  categoricalColumns.forEach((col) => {
    const uniqueValues = [...new Set(data.map((row) => row[col]))]
    const labelMap: { [key: string]: number } = {}
    uniqueValues.forEach((value, index) => {
      labelMap[value] = index
    })

    processedData = processedData.map((row) => ({
      ...row,
      [col]: labelMap[row[col]] ?? 0,
    }))
  })

  return processedData
}

function applyStandardScaling(data: any[], targetColumn: string): any[] {
  const columns = Object.keys(data[0])
  const numericColumns = columns.filter(
    (col) => col !== targetColumn && data.every((row) => typeof row[col] === "number"),
  )

  const stats: { [key: string]: { mean: number; std: number } } = {}

  // Calculate mean and standard deviation
  numericColumns.forEach((col) => {
    const values = data.map((row) => row[col])
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length
    const std = Math.sqrt(variance)
    stats[col] = { mean, std: std || 1 } // Avoid division by zero
  })

  // Apply scaling
  return data.map((row) => {
    const newRow = { ...row }
    numericColumns.forEach((col) => {
      newRow[col] = (row[col] - stats[col].mean) / stats[col].std
    })
    return newRow
  })
}

function applyMinMaxScaling(data: any[], targetColumn: string): any[] {
  const columns = Object.keys(data[0])
  const numericColumns = columns.filter(
    (col) => col !== targetColumn && data.every((row) => typeof row[col] === "number"),
  )

  const ranges: { [key: string]: { min: number; max: number } } = {}

  // Calculate min and max
  numericColumns.forEach((col) => {
    const values = data.map((row) => row[col])
    const min = Math.min(...values)
    const max = Math.max(...values)
    ranges[col] = { min, max: max === min ? min + 1 : max } // Avoid division by zero
  })

  // Apply scaling
  return data.map((row) => {
    const newRow = { ...row }
    numericColumns.forEach((col) => {
      newRow[col] = (row[col] - ranges[col].min) / (ranges[col].max - ranges[col].min)
    })
    return newRow
  })
}

function applyPCA(data: any[], targetColumn: string, varianceToRetain: number): any[] {
  // Simplified PCA simulation - in reality this would use proper linear algebra
  const columns = Object.keys(data[0])
  const featureColumns = columns.filter(
    (col) => col !== targetColumn && data.every((row) => typeof row[col] === "number"),
  )

  // Simulate PCA by creating fewer components
  const numComponents = Math.max(2, Math.floor(featureColumns.length * (varianceToRetain / 100)))

  return data.map((row) => {
    const newRow: any = { [targetColumn]: row[targetColumn] }

    // Create simulated PCA components
    for (let i = 0; i < numComponents; i++) {
      let componentValue = 0
      featureColumns.forEach((col, index) => {
        // Simulate component weights
        const weight = Math.sin(((i + 1) * (index + 1) * Math.PI) / featureColumns.length)
        componentValue += row[col] * weight
      })
      newRow[`PC${i + 1}`] = componentValue
    }

    return newRow
  })
}

function removeDuplicates(data: any[], strategy: "keep_first" | "keep_last" | null = null): any[] {
  const seen = new Set()
  const result: any[] = []

  if (strategy === "keep_last") {
    data.forEach((row) => {
      const rowString = JSON.stringify(row)
      if (seen.has(rowString)) {
        result.pop() // Remove the previously added duplicate
      }
      result.push(row)
      seen.add(rowString)
    })
  } else {
    // Default or "keep_first" strategy
    data.forEach((row) => {
      const rowString = JSON.stringify(row)
      if (!seen.has(rowString)) {
        result.push(row)
        seen.add(rowString)
      }
    })
  }

  return result
}

function detectOutliers(data: any[], method: "iqr" | "zscore" | "isolation_forest"): any[] {
  if (method === "iqr") {
    return detectOutliersIQR(data)
  } else if (method === "zscore") {
    return detectOutliersZScore(data)
  } else if (method === "isolation_forest") {
    return detectOutliersIsolationForest(data)
  } else {
    console.warn(`Unknown outlier detection method: ${method}. Returning original data.`)
    return data
  }
}

function detectOutliersIQR(data: any[]): any[] {
  const columns = Object.keys(data[0])
  const numericColumns = columns.filter((col) => data.every((row) => typeof row[col] === "number"))

  const outlierRows = new Set<number>()

  numericColumns.forEach((col) => {
    const values = data.map((row) => row[col]).sort((a, b) => a - b)
    const q1 = values[Math.floor(values.length * 0.25)]
    const q3 = values[Math.floor(values.length * 0.75)]
    const iqr = q3 - q1
    const lowerBound = q1 - 1.5 * iqr
    const upperBound = q3 + 1.5 * iqr

    data.forEach((row, index) => {
      if (typeof row[col] === "number" && (row[col] < lowerBound || row[col] > upperBound)) {
        outlierRows.add(index)
      }
    })
  })

  // Mark outliers (you might want to remove them or handle them differently)
  return data.map((row, index) => (outlierRows.has(index) ? { ...row, isOutlier: true } : row))
}

function detectOutliersZScore(data: any[]): any[] {
  const columns = Object.keys(data[0])
  const numericColumns = columns.filter((col) => data.every((row) => typeof row[col] === "number"))

  const outlierRows = new Set<number>()

  numericColumns.forEach((col) => {
    const values = data.map((row) => row[col])
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length
    const std = Math.sqrt(values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length)

    data.forEach((row, index) => {
      if (typeof row[col] === "number") {
        const zScore = Math.abs((row[col] - mean) / (std || 1)) // Avoid division by zero
        if (zScore > 3) {
          // Common threshold for Z-score
          outlierRows.add(index)
        }
      }
    })
  })

  // Mark outliers
  return data.map((row, index) => (outlierRows.has(index) ? { ...row, isOutlier: true } : row))
}

function detectOutliersIsolationForest(data: any[]): any[] {
  // Placeholder for Isolation Forest implementation.
  // Requires a dedicated library (e.g., scikit-learn in Python, or a JS port).
  console.warn("Isolation Forest outlier detection is a placeholder and not fully implemented.")
  return data.map((row, index) => ({ ...row, isOutlier: false })) // Mark all as not outliers for now
}

function selectFeatures(data: any[], targetColumn: string, method: "variance" | "correlation" | "mutual_info"): any[] {
  if (method === "variance") {
    return selectFeaturesByVariance(data, targetColumn)
  } else if (method === "correlation") {
    return selectFeaturesByCorrelation(data, targetColumn)
  } else if (method === "mutual_info") {
    return selectFeaturesByMutualInfo(data, targetColumn)
  } else {
    console.warn(`Unknown feature selection method: ${method}. Returning original data.`)
    return data
  }
}

function selectFeaturesByVariance(data: any[], targetColumn: string): any[] {
  const columns = Object.keys(data[0])
  const featureColumns = columns.filter(
    (col) => col !== targetColumn && data.every((row) => typeof row[col] === "number"),
  )

  const variances: { [key: string]: number } = {}
  featureColumns.forEach((col) => {
    const values = data.map((row) => row[col])
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length
    variances[col] = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length
  })

  // Select features with variance above a threshold (e.g., 0.1)
  const selectedFeatures = featureColumns.filter((col) => variances[col] > 0.1)

  return data.map((row) => {
    const newRow: any = { [targetColumn]: row[targetColumn] }
    selectedFeatures.forEach((col) => {
      newRow[col] = row[col]
    })
    return newRow
  })
}

function selectFeaturesByCorrelation(data: any[], targetColumn: string): any[] {
  // Placeholder for correlation-based feature selection.
  // Requires calculating correlation between each feature and the target.
  console.warn("Correlation-based feature selection is a placeholder and not fully implemented.")
  return data // Return original data for now
}

function selectFeaturesByMutualInfo(data: any[], targetColumn: string): any[] {
  // Placeholder for mutual information-based feature selection.
  // Requires calculating mutual information between each feature and the target.
  console.warn("Mutual information-based feature selection is a placeholder and not fully implemented.")
  return data // Return original data for now
}

function validateData(data: any[]): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!Array.isArray(data)) {
    errors.push("Data must be an array.")
    return { isValid: false, errors }
  }

  if (data.length === 0) {
    errors.push("Data array is empty.")
    return { isValid: false, errors }
  }

  const columns = Object.keys(data[0])
  if (columns.length === 0) {
    errors.push("Data rows have no columns.")
    return { isValid: false, errors }
  }

  data.forEach((row, index) => {
    if (typeof row !== "object" || row === null) {
      errors.push(`Row ${index + 1} is not an object.`)
      return
    }

    const rowColumns = Object.keys(row)
    if (rowColumns.length !== columns.length) {
      errors.push(`Row ${index + 1} has a different number of columns.`)
      return
    }

    columns.forEach((col) => {
      if (!rowColumns.includes(col)) {
        errors.push(`Row ${index + 1} is missing column "${col}".`)
      }
    })
  })

  return { isValid: errors.length === 0, errors }
}

function calculateDataQualityMetrics(data: any[]): any {
  const totalRows = data.length
  const columns = Object.keys(data[0])
  const missingValuesCount: { [key: string]: number } = {}
  const dataTypeCounts: { [key: string]: { [key: string]: number } } = {}

  columns.forEach((col) => {
    missingValuesCount[col] = 0
    dataTypeCounts[col] = {}
  })

  data.forEach((row) => {
    columns.forEach((col) => {
      const value = row[col]
      if (value === null || value === undefined || value === "") {
        missingValuesCount[col]++
      }

      const dataType = typeof value
      dataTypeCounts[col][dataType] = (dataTypeCounts[col][dataType] || 0) + 1
    })
  })

  const missingValuesPercentage: { [key: string]: number } = {}
  columns.forEach((col) => {
    missingValuesPercentage[col] = (missingValuesCount[col] / totalRows) * 100
  })

  return {
    totalRows,
    columns,
    missingValuesCount,
    missingValuesPercentage,
    dataTypeCounts,
  }
}
