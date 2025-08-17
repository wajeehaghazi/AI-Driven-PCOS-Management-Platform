import React, { useState } from 'react';
import { UploadIcon, AlertCircleIcon, CheckCircleIcon, ZapIcon, ImageIcon, FileTextIcon } from 'lucide-react';
export function UltrasoundAnalysis() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent) => {
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
    reader.onload = e => {
      if (e.target?.result) {
        setUploadedImage(e.target.result as string);
        simulateAnalysis();
      }
    };
    reader.readAsDataURL(file);
  };
  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    // Simulate analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 3000);
  };
  const resetAnalysis = () => {
    setUploadedImage(null);
    setAnalysisComplete(false);
  };
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <div>
          {!uploadedImage ? <div className={`border-3 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${isDragging ? 'border-teal-500 bg-teal-50 scale-[1.02]' : 'border-gray-300 hover:border-teal-400 hover:bg-teal-50/30'}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={() => document.getElementById('fileInput')?.click()} role="button" aria-label="Upload ultrasound image" tabIndex={0}>
              <input type="file" id="fileInput" className="hidden" accept="image/*" onChange={handleFileInput} aria-label="File upload input" />
              <div className="bg-teal-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <ImageIcon size={40} className="text-teal-600" />
              </div>
              <h3 className="text-2xl font-medium text-gray-900 mb-3">
                Upload Ultrasound Image
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                Drag and drop your image here or click to browse
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <div className="bg-white/80 rounded-lg px-4 py-2 border border-gray-200 text-sm flex items-center">
                  <span className="w-3 h-3 bg-teal-400 rounded-full mr-2"></span>
                  JPG
                </div>
                <div className="bg-white/80 rounded-lg px-4 py-2 border border-gray-200 text-sm flex items-center">
                  <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                  PNG
                </div>
                <div className="bg-white/80 rounded-lg px-4 py-2 border border-gray-200 text-sm flex items-center">
                  <span className="w-3 h-3 bg-purple-400 rounded-full mr-2"></span>
                  DICOM
                </div>
              </div>
              <p className="text-sm text-gray-500 flex items-center justify-center">
                <AlertCircleIcon size={14} className="mr-1" />
                Your images are processed securely and privately
              </p>
            </div> : <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
              <div className="bg-gradient-to-r from-teal-600 to-blue-600 px-6 py-3 text-white flex justify-between items-center">
                <div className="flex items-center">
                  <ImageIcon size={18} className="mr-2" />
                  <span className="font-medium">Ultrasound Image</span>
                </div>
                <div className="text-sm opacity-80">
                  {new Date().toLocaleDateString()}
                </div>
              </div>
              <img src={uploadedImage} alt="Uploaded ultrasound" className="w-full h-auto" />
              {isAnalyzing && <div className="bg-white p-6 border-t">
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full border-4 border-teal-100"></div>
                      <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-t-4 border-teal-600 animate-spin"></div>
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-gray-900">
                        Analyzing image...
                      </p>
                      <p className="text-sm text-gray-500">
                        Using advanced medical AI models
                      </p>
                    </div>
                  </div>
                </div>}
              {analysisComplete && <div className="bg-white p-6 border-t">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 rounded-full p-2 mr-3">
                      <CheckCircleIcon size={24} className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Analysis complete
                      </p>
                      <p className="text-sm text-gray-500">Results available</p>
                    </div>
                  </div>
                  <button onClick={resetAnalysis} className="w-full mt-2 px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-gray-700 font-medium flex items-center justify-center">
                    <UploadIcon size={18} className="mr-2" />
                    Upload a different image
                  </button>
                </div>}
            </div>}
        </div>
        <div className={`rounded-2xl shadow-xl transition-all duration-500 overflow-hidden ${!analysisComplete ? 'bg-gray-50 border border-gray-200 opacity-75' : 'bg-white border-2 border-teal-100'}`}>
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <FileTextIcon size={20} className="mr-3" />
              <h3 className="text-lg font-medium">Analysis Results</h3>
            </div>
            <div className="bg-teal-500 text-xs rounded-full px-3 py-1 font-medium">
              AI Powered
            </div>
          </div>
          <div className="p-8">
            {!analysisComplete ? <div className="text-center py-16">
                <div className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 opacity-50">
                  <FileTextIcon size={32} className="text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg">
                  Upload an ultrasound image to see AI-generated results
                </p>
                <p className="text-gray-400 text-sm mt-2 max-w-md mx-auto">
                  Our advanced AI will analyze the image and provide detailed
                  insights about potential PCOS indicators
                </p>
              </div> : <div className="space-y-8">
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                  <h4 className="flex items-center font-semibold text-blue-800 mb-3 text-lg">
                    <div className="bg-blue-200 p-1.5 rounded-md mr-2">
                      <CheckCircleIcon size={18} className="text-blue-700" />
                    </div>
                    Preliminary Assessment
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    The ultrasound image shows multiple small follicles arranged
                    in a peripheral pattern, which is consistent with polycystic
                    ovarian morphology. The analysis indicates a{' '}
                    <span className="font-medium text-blue-800">
                      78% probability
                    </span>{' '}
                    of PCOS-related features.
                  </p>
                </div>
                <div>
                  <h4 className="flex items-center font-semibold text-gray-900 mb-4 text-lg">
                    <div className="bg-gray-200 p-1.5 rounded-md mr-2">
                      <FileTextIcon size={18} className="text-gray-700" />
                    </div>
                    Key Observations
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start">
                      <div className="bg-teal-100 p-1 rounded-md mr-3">
                        <CheckCircleIcon size={16} className="text-teal-700" />
                      </div>
                      <div>
                        <div className="font-medium">Follicle Count</div>
                        <div className="text-gray-700">
                          12+ follicles measuring 2-9mm in diameter
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start">
                      <div className="bg-teal-100 p-1 rounded-md mr-3">
                        <CheckCircleIcon size={16} className="text-teal-700" />
                      </div>
                      <div>
                        <div className="font-medium">Ovarian Volume</div>
                        <div className="text-gray-700">
                          Increased (10.2 cm³)
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start">
                      <div className="bg-teal-100 p-1 rounded-md mr-3">
                        <CheckCircleIcon size={16} className="text-teal-700" />
                      </div>
                      <div>
                        <div className="font-medium">Follicle Distribution</div>
                        <div className="text-gray-700">
                          Peripheral pattern observed
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start">
                      <div className="bg-teal-100 p-1 rounded-md mr-3">
                        <CheckCircleIcon size={16} className="text-teal-700" />
                      </div>
                      <div>
                        <div className="font-medium">Stromal Echogenicity</div>
                        <div className="text-gray-700">Increased</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-amber-50 p-6 rounded-xl border border-amber-100 flex">
                  <AlertCircleIcon size={24} className="text-amber-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-amber-800 mb-2 text-lg">
                      Important Note
                    </h4>
                    <p className="text-gray-700">
                      This AI analysis is preliminary and should be reviewed by
                      a healthcare provider. The results are not a definitive
                      diagnosis of PCOS. Always consult with a medical
                      professional for proper diagnosis.
                    </p>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-medium text-gray-900 mb-4 text-lg">
                    Next Steps
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button className="px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-xl hover:from-teal-700 hover:to-blue-700 transition-colors shadow-lg shadow-teal-600/20 font-medium flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      Share with Doctor
                    </button>
                    <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download Report
                    </button>
                  </div>
                </div>
              </div>}
          </div>
        </div>
      </div>
    </div>;
}