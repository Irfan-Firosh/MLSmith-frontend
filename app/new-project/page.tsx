"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Upload,
  FileText,
  ArrowRight,
  ArrowLeft,
  Eye,
  BarChart3,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { DataPreview } from "@/components/data-preview";
import { processDataset } from "@/lib/data-processor";

export default function NewProjectPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectName, setProjectName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [rawData, setRawData] = useState<any[]>([]);
  const [processedData, setProcessedData] = useState<any[]>([]);
  const [targetColumn, setTargetColumn] = useState("");
  const [problemType, setProblemType] = useState("classification");
  const [missingValues, setMissingValues] = useState("mean");
  const [encoding, setEncoding] = useState<string[]>([]);
  const [scaling, setScaling] = useState<string[]>([]);
  const [pca, setPca] = useState(false);
  const [pcaVariance, setPcaVariance] = useState("95");
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const uploadedFile = e.target.files[0];
      setFile(uploadedFile);

      // Parse the file
      const text = await uploadedFile.text();
      try {
        let data: any[] = [];

        if (uploadedFile.name.endsWith(".csv")) {
          // Simple CSV parser
          const lines = text.split("\n").filter((line) => line.trim());
          const headers = lines[0].split(",").map((h) => h.trim());

          data = lines.slice(1).map((line) => {
            const values = line.split(",").map((v) => v.trim());
            const row: any = {};
            headers.forEach((header, index) => {
              const value = values[index];
              // Try to parse as number, otherwise keep as string
              row[header] = isNaN(Number(value)) ? value : Number(value);
            });
            return row;
          });
        } else if (uploadedFile.name.endsWith(".json")) {
          data = JSON.parse(text);
        }

        setRawData(data);
        toast({
          title: "File uploaded successfully!",
          description: `Loaded ${data.length} rows with ${
            Object.keys(data[0] || {}).length
          } columns.`,
        });
      } catch (error) {
        toast({
          title: "Error parsing file",
          description: "Please check your file format and try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleEncodingChange = (value: string, checked: boolean) => {
    if (checked) {
      setEncoding([...encoding, value]);
    } else {
      setEncoding(encoding.filter((item) => item !== value));
    }
  };

  const handleScalingChange = (value: string, checked: boolean) => {
    if (checked) {
      setScaling([...scaling, value]);
    } else {
      setScaling(scaling.filter((item) => item !== value));
    }
  };

  const handlePreprocessData = async () => {
    setIsProcessing(true);

    try {
      const config = {
        missingValues,
        encoding,
        scaling,
        pca: pca ? { variance: Number(pcaVariance) } : null,
        targetColumn,
      };

      const processed = await processDataset(rawData, config);
      setProcessedData(processed);

      toast({
        title: "Data preprocessed successfully!",
        description: "Your data is ready for model training.",
      });

      setCurrentStep(4); // Move to preview step
    } catch (error) {
      toast({
        title: "Preprocessing failed",
        description: "There was an error processing your data.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleProcessAndExportData = () => {
    const projectData = {
      name: projectName,
      data: processedData,
      config: {
        problemType,
        targetColumn,
        missingValues,
        encoding,
        scaling,
        pca: pca ? { variance: Number(pcaVariance) } : null,
      },
    };

    // Store project data in localStorage for demo purposes
    localStorage.setItem("currentProject", JSON.stringify(projectData));

    toast({
      title: "Data processed and exported!",
      description: "Your processed data is ready.",
    });
    router.push("/pipeline/processed-123");
  };

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const columns = rawData.length > 0 ? Object.keys(rawData[0]) : [];

  return (
    <div className='flex-1 space-y-6 p-6 bg-black min-h-screen'>
      <div className='flex items-center space-x-4'>
        <SidebarTrigger />
        <div>
          <h1 className='text-3xl font-bold text-white'>New ML Project</h1>
          <p className='text-slate-400'>
            Create a new machine learning project from your data
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className='flex items-center justify-center mb-8'>
        <div className='flex items-center space-x-4'>
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className='flex items-center'>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  currentStep >= step
                    ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-black shadow-lg shadow-cyan-500/25"
                    : "bg-slate-800/50 text-slate-400 border border-slate-700"
                }`}>
                {step}
              </div>
              {step < 4 && (
                <div
                  className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                    currentStep > step
                      ? "bg-gradient-to-r from-cyan-500 to-emerald-500"
                      : "bg-slate-800"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Upload Data */}
      {currentStep === 1 && (
        <Card className='max-w-2xl mx-auto bg-slate-900/50 border-slate-800/50 backdrop-blur-sm'>
          <CardHeader>
            <CardTitle className='text-white'>Upload Dataset</CardTitle>
            <CardDescription className='text-slate-400'>
              Upload your data file to begin the ML workflow
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='space-y-2'>
              <Label htmlFor='projectName' className='text-slate-300'>
                Project Name
              </Label>
              <Input
                id='projectName'
                placeholder='Enter project name'
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className='bg-slate-800/50 border-slate-700 text-white focus:border-cyan-400 focus:ring-cyan-400/20'
              />
            </div>

            <div className='space-y-2'>
              <Label className='text-slate-300'>Dataset File</Label>
              <div className='border-2 border-dashed border-slate-700 rounded-lg p-8 text-center hover:border-cyan-400/50 transition-colors'>
                <Upload className='mx-auto h-12 w-12 text-slate-400 mb-4' />
                <div className='space-y-2'>
                  <p className='text-slate-300'>
                    Drop your file here, or click to browse
                  </p>
                  <p className='text-sm text-slate-400'>
                    Supports CSV, Excel, JSON files up to 100MB
                  </p>
                </div>
                <Input
                  type='file'
                  accept='.csv,.xlsx,.xls,.json'
                  onChange={handleFileUpload}
                  className='mt-4 bg-slate-800/50 border-slate-700 text-white file:bg-slate-700 file:text-white file:border-0'
                />
              </div>
              {file && (
                <div className='flex items-center space-x-2 p-3 bg-slate-800/50 rounded-lg border border-slate-700'>
                  <FileText className='h-5 w-5 text-cyan-400' />
                  <span className='text-white'>{file.name}</span>
                  <span className='text-slate-400 text-sm'>
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
              )}
            </div>

            {rawData.length > 0 && (
              <div className='space-y-2'>
                <Label className='text-slate-300'>Data Preview</Label>
                <DataPreview data={rawData.slice(0, 5)} />
                <p className='text-sm text-slate-400'>
                  Showing 5 of {rawData.length} rows, {columns.length} columns
                </p>
              </div>
            )}

            <div className='flex justify-end'>
              <Button
                onClick={nextStep}
                disabled={!projectName || !file || rawData.length === 0}
                className='bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-black font-semibold shadow-lg shadow-cyan-500/25'>
                Next Step
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Configure Problem */}
      {currentStep === 2 && (
        <Card className='max-w-2xl mx-auto bg-slate-900/50 border-slate-800/50 backdrop-blur-sm'>
          <CardHeader>
            <CardTitle className='text-white'>Select Target Column</CardTitle>
            <CardDescription className='text-slate-400'>
              Define your machine learning problem and target variable
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='space-y-3'>
              <Label className='text-slate-300 text-base font-medium'>
                Problem Type
              </Label>
              <RadioGroup value={problemType} onValueChange={setProblemType}>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='classification' id='classification' />
                  <Label htmlFor='classification' className='text-slate-300'>
                    Classification (Predict categories)
                  </Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='regression' id='regression' />
                  <Label htmlFor='regression' className='text-slate-300'>
                    Regression (Predict numbers)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className='space-y-2'>
              <Label className='text-slate-300'>Target Column</Label>
              <Select value={targetColumn} onValueChange={setTargetColumn}>
                <SelectTrigger className='bg-slate-800/50 border-slate-700 text-white focus:border-cyan-400'>
                  <SelectValue placeholder='Select the column to predict' />
                </SelectTrigger>
                <SelectContent className='bg-slate-900/90 border-slate-800/50 backdrop-blur-xl'>
                  {columns.map((column) => (
                    <SelectItem
                      key={column}
                      value={column}
                      className='text-white hover:bg-slate-800/50'>
                      {column}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='flex justify-between'>
              <Button
                variant='outline'
                onClick={prevStep}
                className='border-slate-700 text-slate-300 hover:bg-slate-800/50'>
                <ArrowLeft className='mr-2 h-4 w-4' />
                Previous
              </Button>
              <Button
                onClick={nextStep}
                disabled={!targetColumn}
                className='bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-black font-semibold shadow-lg shadow-cyan-500/25'>
                Next Step
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Preprocessing Configuration */}
      {currentStep === 3 && (
        <Card className='max-w-2xl mx-auto bg-slate-900/50 border-slate-800/50 backdrop-blur-sm'>
          <CardHeader>
            <CardTitle className='text-white'>
              Configure Preprocessing Steps
            </CardTitle>
            <CardDescription className='text-slate-400'>
              Select preprocessing techniques for your data
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            {/* Missing Values */}
            <div className='space-y-3'>
              <Label className='text-slate-300 text-base font-medium'>
                Handle Missing Values
              </Label>
              <RadioGroup
                value={missingValues}
                onValueChange={setMissingValues}>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='mean' id='mean' />
                  <Label htmlFor='mean' className='text-slate-300'>
                    Fill with Mean
                  </Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='median' id='median' />
                  <Label htmlFor='median' className='text-slate-300'>
                    Fill with Median
                  </Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='ffill' id='ffill' />
                  <Label htmlFor='ffill' className='text-slate-300'>
                    Forward Fill
                  </Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='bfill' id='bfill' />
                  <Label htmlFor='bfill' className='text-slate-300'>
                    Backward Fill
                  </Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='drop' id='drop' />
                  <Label htmlFor='drop' className='text-slate-300'>
                    Drop Rows
                  </Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='drop_columns' id='drop_columns' />
                  <Label htmlFor='drop_columns' className='text-slate-300'>
                    Drop Columns
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Encoding */}
            <div className='space-y-3'>
              <Label className='text-slate-300 text-base font-medium'>
                Categorical Encoding
              </Label>
              <div className='space-y-2'>
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='onehot'
                    checked={encoding.includes("onehot")}
                    onCheckedChange={(checked) =>
                      handleEncodingChange("onehot", checked as boolean)
                    }
                  />
                  <Label htmlFor='onehot' className='text-slate-300'>
                    One-Hot Encoding
                  </Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='label'
                    checked={encoding.includes("label")}
                    onCheckedChange={(checked) =>
                      handleEncodingChange("label", checked as boolean)
                    }
                  />
                  <Label htmlFor='label' className='text-slate-300'>
                    Label Encoding
                  </Label>
                </div>
              </div>
            </div>

            {/* Scaling */}
            <div className='space-y-3'>
              <Label className='text-slate-300 text-base font-medium'>
                Feature Scaling
              </Label>
              <div className='space-y-2'>
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='standard'
                    checked={scaling.includes("standard")}
                    onCheckedChange={(checked) =>
                      handleScalingChange("standard", checked as boolean)
                    }
                  />
                  <Label htmlFor='standard' className='text-slate-300'>
                    Standard Scaling
                  </Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='minmax'
                    checked={scaling.includes("minmax")}
                    onCheckedChange={(checked) =>
                      handleScalingChange("minmax", checked as boolean)
                    }
                  />
                  <Label htmlFor='minmax' className='text-slate-300'>
                    MinMax Scaling
                  </Label>
                </div>
              </div>
            </div>

            {/* Feature Selection */}
            <div className='space-y-3'>
              <Label className='text-slate-300 text-base font-medium'>
                Feature Selection
              </Label>
              <div className='space-y-2'>
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='select_k_best'
                    checked={false}
                    onCheckedChange={() => {}}
                  />
                  <Label htmlFor='select_k_best' className='text-slate-300'>
                    Select K Best
                  </Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='rfe'
                    checked={false}
                    onCheckedChange={() => {}}
                  />
                  <Label htmlFor='rfe' className='text-slate-300'>
                    Recursive Feature Elimination
                  </Label>
                </div>
              </div>
            </div>

            {/* Outlier Detection */}
            <div className='space-y-3'>
              <Label className='text-slate-300 text-base font-medium'>
                Outlier Detection
              </Label>
              <div className='space-y-2'>
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='isolation_forest'
                    checked={false}
                    onCheckedChange={() => {}}
                  />
                  <Label htmlFor='isolation_forest' className='text-slate-300'>
                    Isolation Forest
                  </Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='local_outlier_factor'
                    checked={false}
                    onCheckedChange={() => {}}
                  />
                  <Label
                    htmlFor='local_outlier_factor'
                    className='text-slate-300'>
                    Local Outlier Factor
                  </Label>
                </div>
              </div>
            </div>

            {/* Data Validation Checks */}
            <div className='space-y-3'>
              <Label className='text-slate-300 text-base font-medium'>
                Data Validation Checks
              </Label>
              <div className='space-y-2'>
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='check_duplicates'
                    checked={false}
                    onCheckedChange={() => {}}
                  />
                  <Label htmlFor='check_duplicates' className='text-slate-300'>
                    Check Duplicates
                  </Label>
                </div>
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='check_inconsistent_data'
                    checked={false}
                    onCheckedChange={() => {}}
                  />
                  <Label
                    htmlFor='check_inconsistent_data'
                    className='text-slate-300'>
                    Check Inconsistent Data
                  </Label>
                </div>
              </div>
            </div>

            {/* PCA */}
            <div className='space-y-3'>
              <div className='flex items-center space-x-2'>
                <Checkbox
                  id='pca'
                  checked={pca}
                  onCheckedChange={(checked) => setPca(checked as boolean)}
                />
                <Label
                  htmlFor='pca'
                  className='text-slate-300 text-base font-medium'>
                  Apply PCA
                </Label>
              </div>
              {pca && (
                <div className='ml-6 space-y-2'>
                  <Label className='text-slate-300'>
                    Variance to Retain (%)
                  </Label>
                  <Select value={pcaVariance} onValueChange={setPcaVariance}>
                    <SelectTrigger className='bg-slate-800/50 border-slate-700 text-white focus:border-cyan-400'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className='bg-slate-900/90 border-slate-800/50 backdrop-blur-xl'>
                      <SelectItem value='90'>90%</SelectItem>
                      <SelectItem value='95'>95%</SelectItem>
                      <SelectItem value='99'>99%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className='flex justify-between'>
              <Button
                variant='outline'
                onClick={prevStep}
                className='border-slate-700 text-slate-300 hover:bg-slate-800/50'>
                <ArrowLeft className='mr-2 h-4 w-4' />
                Previous
              </Button>
              <Button
                onClick={handlePreprocessData}
                disabled={isProcessing}
                className='bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-black font-semibold shadow-lg shadow-cyan-500/25'>
                {isProcessing ? "Processing..." : "Process Data"}
                <Eye className='ml-2 h-4 w-4' />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Data Preview & Training */}
      {currentStep === 4 && (
        <Card className='max-w-4xl mx-auto bg-slate-900/50 border-slate-800/50 backdrop-blur-sm'>
          <CardHeader>
            <CardTitle className='text-white'>Preview & Process Data</CardTitle>
            <CardDescription className='text-slate-400'>
              Review your processed data before starting model training
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            {processedData.length > 0 && (
              <>
                <h3 className='text-white font-semibold mb-2'>
                  Before Preprocessing
                </h3>
                <DataPreview data={rawData.slice(0, 5)} />
                <p className='text-sm text-slate-400'>
                  Showing 5 of {rawData.length} original rows
                </p>

                <h3 className='text-white font-semibold mt-4 mb-2'>
                  After Preprocessing
                </h3>
                <DataPreview data={processedData.slice(0, 5)} />
                <p className='text-sm text-slate-400'>
                  Showing 5 of {processedData.length} processed rows
                </p>

                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                  <div className='bg-slate-800/50 p-4 rounded-lg border border-slate-700'>
                    <p className='text-slate-400 text-sm'>Original Rows</p>
                    <p className='text-white text-2xl font-bold'>
                      {rawData.length}
                    </p>
                  </div>
                  <div className='bg-slate-800/50 p-4 rounded-lg border border-slate-700'>
                    <p className='text-slate-400 text-sm'>Processed Rows</p>
                    <p className='text-white text-2xl font-bold'>
                      {processedData.length}
                    </p>
                  </div>
                  <div className='bg-slate-800/50 p-4 rounded-lg border border-slate-700'>
                    <p className='text-slate-400 text-sm'>Features</p>
                    <p className='text-white text-2xl font-bold'>
                      {Object.keys(processedData[0] || {}).length - 1}
                    </p>
                  </div>
                  <div className='bg-slate-800/50 p-4 rounded-lg border border-slate-700'>
                    <p className='text-slate-400 text-sm'>Target</p>
                    <p className='text-white text-lg font-bold'>
                      {targetColumn}
                    </p>
                  </div>
                </div>
              </>
            )}

            <div className='flex justify-between'>
              <Button
                variant='outline'
                onClick={prevStep}
                className='border-slate-700 text-slate-300 hover:bg-slate-800/50'>
                <ArrowLeft className='mr-2 h-4 w-4' />
                Previous
              </Button>
              <Button
                onClick={handleProcessAndExportData}
                className='bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-black font-semibold shadow-lg shadow-cyan-500/25'>
                <BarChart3 className='mr-2 h-4 w-4' />
                Process & Export Data
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
