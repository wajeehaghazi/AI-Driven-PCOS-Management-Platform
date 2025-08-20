import React, { useState } from 'react';
import { UploadIcon, AlertCircleIcon, CheckCircleIcon, ZapIcon, ImageIcon, FileTextIcon } from 'lucide-react';

// Define interface for prediction result
interface Prediction {
  label: string;
  probability: number;
  gradcam_heatmap?: string;
}

export function UltrasoundAnalysis() {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisComplete, setAnalysisComplete] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0]);
    }
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result && typeof e.target.result === 'string') {
        setUploadedImage(e.target.result);
        runInference(file);
      }
    };
    reader.readAsDataURL(file);
  };

  const runInference = async (file: File) => {
    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://127.0.0.1:4933/predict", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Inference result:", result);

      if (result.error) {
        throw new Error(result.error);
      }

      // Determine the final prediction based on 96% confidence threshold
      const confidenceThreshold = 0.96;
      const isConfident = result.probability >= confidenceThreshold;
      const finalLabel = isConfident
        ? result.label
        : result.label.toLowerCase() === "infected" ? "noninfected" : "infected";

      setPrediction({
        label: finalLabel,
        probability: result.probability,
        gradcam_heatmap: result.gradcam_heatmap
      });

      setIsAnalyzing(false);
      setAnalysisComplete(true);
    } catch (error) {
      console.error("Error running inference:", error);
      setError(error instanceof Error ? error.message : "An error occurred while analyzing the image");
      setIsAnalyzing(false);
      setAnalysisComplete(false);
    }
  };

  const resetAnalysis = () => {
    setUploadedImage(null);
    setAnalysisComplete(false);
    setPrediction(null);
    setError(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <div className="inline-flex items-center px-4 py-2 bg-teal-100 rounded-full text-sm font-medium text-teal-800 mb-4">
          <ZapIcon size={16} className="mr-2" /> Advanced Analysis
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          AI-Powered Ultrasound Analysis
        </h2>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
          Upload your ovarian ultrasound images for instant AI analysis. Our
          advanced system can detect patterns associated with PCOS and provide
          preliminary indicators within seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side - Upload */}
        <div>
          {!uploadedImage ? (
            <div
              className={`border-3 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${isDragging ? "border-teal-500 bg-teal-50 scale-[1.02]" : "border-gray-300 hover:border-teal-400 hover:bg-teal-50/30"}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById("fileInput")?.click()}
              role="button"
              aria-label="Upload ultrasound image"
              tabIndex={0}
            >
              <input type="file" id="fileInput" className="hidden" accept="image/*" onChange={handleFileInput} aria-label="File upload input" />
              <div className="bg-teal-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <ImageIcon size={40} className="text-teal-600" />
              </div>
              <h3 className="text-2xl font-medium text-gray-900 mb-3">Upload Ultrasound Image</h3>
              <p className="text-gray-600 mb-6 text-lg">Drag and drop your image here or click to browse</p>
            </div>
          ) : (
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
              <div className="bg-gradient-to-r from-teal-600 to-blue-600 px-6 py-3 text-white flex justify-between items-center">
                <div className="flex items-center">
                  <ImageIcon size={18} className="mr-2" />
                  <span className="font-medium">Ultrasound Image</span>
                </div>
                <div className="text-sm opacity-80">{new Date().toLocaleDateString()}</div>
              </div>
              <img src={uploadedImage} alt="Uploaded ultrasound" className="w-full h-auto" />

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 p-6 border-t border-red-100">
                  <div className="flex items-center">
                    <AlertCircleIcon size={24} className="text-red-600 mr-3" />
                    <div>
                      <p className="font-medium text-red-900">Analysis Error</p>
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                  <button
                    onClick={resetAnalysis}
                    className="w-full mt-4 px-4 py-2 bg-red-100 rounded-lg hover:bg-red-200 transition-colors text-red-700 font-medium"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* Loading Spinner */}
              {isAnalyzing && (
                <div className="bg-white p-6 border-t">
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full border-4 border-teal-100"></div>
                      <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-t-4 border-teal-600 animate-spin"></div>
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-gray-900">Analyzing image...</p>
                      <p className="text-sm text-gray-500">Using advanced medical AI models</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Results */}
              {analysisComplete && prediction && (
                <div className="bg-white p-6 border-t">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 rounded-full p-2 mr-3">
                      <CheckCircleIcon size={24} className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Analysis complete</p>
                      <p className="text-sm text-gray-500">
                        {prediction.label.toUpperCase()} detected
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={resetAnalysis}
                    className="w-full mt-2 px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-gray-700 font-medium flex items-center justify-center"
                  >
                    <UploadIcon size={18} className="mr-2" />
                    Upload a different image
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Side - Results Panel */}
        <div
          className={`rounded-2xl shadow-xl transition-all duration-500 overflow-hidden ${!analysisComplete ? "bg-gray-50 border border-gray-200 opacity-75" : "bg-white border-2 border-teal-100"}`}
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <FileTextIcon size={20} className="mr-3" />
              <h3 className="text-lg font-medium">Analysis Results</h3>
            </div>
            <div className="bg-teal-500 text-xs rounded-full px-3 py-1 font-medium">AI Powered</div>
          </div>

          <div className="p-8">
            {!analysisComplete ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">Upload an ultrasound image to see AI-generated results</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                  <h4 className="font-semibold text-blue-800 mb-3 text-lg">Preliminary Assessment</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Our AI model predicts this image as{" "}
                    <span className="font-bold text-blue-800">{prediction?.label.toUpperCase()}</span>.
                  </p>
                </div>
                {prediction?.gradcam_heatmap && (
                  <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                    <h4 className="font-semibold text-purple-800 mb-3 text-lg">Grad-CAM Heatmap</h4>
                    <p className="text-gray-700 mb-4">
                      The heatmap highlights regions the AI model focused on for its prediction. Red areas indicate high importance, while blue areas indicate lower importance.
                    </p>
                    <img
                      src={`data:image/png;base64,${prediction.gradcam_heatmap}`}
                      alt="Grad-CAM Heatmap"
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                )}
                <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
                  <h4 className="font-medium text-amber-800 mb-2 text-lg">Important Note</h4>
                  <p className="text-gray-700">
                    This AI analysis is preliminary and should be reviewed by a healthcare provider. Always consult with a medical professional for proper
                    diagnosis.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}