import React, { useMemo, useState } from 'react';
import { UploadIcon, FileImageIcon, InfoIcon, CheckCircle2Icon, ArrowRightIcon, FlaskConicalIcon, HomeIcon, SmartphoneIcon, DropletIcon, CameraIcon, TimerIcon, MailIcon, TagIcon, PackageIcon, HeartIcon, MoonIcon, UploadCloudIcon, FileTextIcon, ActivityIcon, Edit3Icon, ShieldIcon } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

type UploadedImage = {
  id: string;
  file: File;
  previewUrl: string;
};

export function AtHomeTesting() {
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [testCategory, setTestCategory] = useState('finger-prick');
  const [notes, setNotes] = useState('');
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFilesSelected = (files: FileList | null) => {
    if (!files) return;
    const nextImages: UploadedImage[] = Array.from(files).map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}`,
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setUploadedImages((prev) => [...prev, ...nextImages]);
  };

  const removeImage = (id: string) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== id));
  };

  const resetForm = () => {
    setFullName('');
    setEmailAddress('');
    setTestCategory('finger-prick');
    setNotes('');
    setUploadedImages([]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);
    // Placeholder: integrate backend upload later
    // For now we just reset the form after a short delay to show success UI
    setTimeout(() => {
      resetForm();
    }, 1200);
  };

  const uploadHelpText = useMemo(() => {
    return 'Upload sample images (e.g., urine strips, device screenshots, lab reports). PNG or JPG recommended.';
  }, []);

  return (
    <div className="w-full flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-r from-teal-600 via-blue-500 to-cyan-600 text-white py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581090700227-1e37b190418e?q=80&w=2070&auto=format&fit=crop')] opacity-10 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/90 via-blue-500/80 to-cyan-600/90"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                <FlaskConicalIcon size={16} className="mr-2" /> At‑Home Testing Guide
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">Test at Home, Analyze with Lab or Phone</h1>
              <p className="text-lg md:text-xl text-blue-50">
                You do not need a lab in your bedroom. Collect your sample at home and either mail it to a real lab or use your phone to
                read results from simple kits.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="inline-flex items-center bg-white text-teal-600 rounded-full px-3 py-1 text-sm font-medium">
                  <HomeIcon size={16} className="mr-2" /> Collect at home
                </span>
                <span className="inline-flex items-center bg-white text-teal-600 rounded-full px-3 py-1 text-sm font-medium">
                  <FlaskConicalIcon size={16} className="mr-2" /> Lab analysis
                </span>
                <span className="inline-flex items-center bg-white text-teal-600 rounded-full px-3 py-1 text-sm font-medium">
                  <SmartphoneIcon size={16} className="mr-2" /> Phone readout
                </span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-white/20 rounded-2xl blur-md"></div>
                <img
                  src="https://images.unsplash.com/photo-1615634260167-2f7f4dea1113?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                  alt="At home testing kit"
                  className="relative rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-all duration-500 z-10 heroimg"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    if (img.src.includes('unsplash.com')) {
                      img.src = 'https://images.pexels.com/photos/8442190/pexels-photo-8442190.jpeg?auto=compress&cs=tinysrgb&w=1920';
                    } else {
                      img.onerror = null;
                      img.src = 'https://picsum.photos/1200/800?random=1201';
                    }
                  }}
                />
                <div className="absolute top-3 left-3 bg-white/90 text-teal-700 text-xs px-2 py-1 rounded-md shadow flex items-center">
                  <ShieldIcon size={14} className="mr-1" /> Secure & Private
                </div>
                <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-teal-400 to-blue-500 p-4 rounded-xl shadow-xl z-20">
                  <InfoIcon size={28} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick navigation */}
      <section className="py-4 bg-white/70 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            <a href="#meaning" className="px-3 py-1.5 text-sm bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-full">About at‑home testing</a>
            <a href="#ways" className="px-3 py-1.5 text-sm bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-full">Ways you can test</a>
            <a href="#upload" className="px-3 py-1.5 text-sm bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-full">Upload samples</a>
          </div>
        </div>
      </section>

      {/* What at-home testing means */}
      <section id="meaning" className="py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What “at‑home testing” really means</h2>
            <p className="text-gray-700 mb-4">
              You collect a sample at home, then either send it to a certified lab for testing or use your phone to read results from
              simple kits (urine strips, saliva tests). In short: collect at home, analyze by lab or phone.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="p-6 rounded-xl border border-teal-100 bg-teal-50">
                <h3 className="text-lg font-semibold text-teal-800 mb-2">Mail‑in to lab</h3>
                <p className="text-teal-900">Finger‑prick blood cards and saliva tubes can be mailed to real labs for analysis.</p>
              </div>
              <div className="p-6 rounded-xl border border-blue-100 bg-blue-50">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Phone‑read kits</h3>
                <p className="text-blue-900">Urine strips and some devices can be read with your phone’s camera or app.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ways users can test */}
      <section id="ways" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Ways you can test</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 text-white flex items-center justify-center shadow">
                  <DropletIcon size={18} />
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200">Mail‑in</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Finger‑prick blood cards</h3>
              <p className="text-gray-700 mb-4">Drop a small amount of blood on a card and mail it to a lab.</p>
              <p className="text-gray-600">Measures: HbA1c, cholesterol, thyroid, sometimes hormones.</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">How to do it at home</h4>
                <ol className="list-decimal pl-5 space-y-1 text-gray-700 text-sm">
                  <li className="flex items-start"><DropletIcon size={16} className="mr-2 mt-0.5 text-teal-600" />Wash hands with warm water; warm your finger to increase blood flow.</li>
                  <li className="flex items-start"><DropletIcon size={16} className="mr-2 mt-0.5 text-teal-600" />Clean fingertip with alcohol swab, use lancet, wipe away the first drop.</li>
                  <li className="flex items-start"><DropletIcon size={16} className="mr-2 mt-0.5 text-teal-600" />Gently milk the finger and fill the printed circles on the card; let it air‑dry.</li>
                  <li className="flex items-start"><MailIcon size={16} className="mr-2 mt-0.5 text-teal-600" />Seal the card in the pouch, place into mailer, and send using the included label.</li>
                  <li className="flex items-start"><CameraIcon size={16} className="mr-2 mt-0.5 text-teal-600" />Optional: take a clear photo of the card for your records and upload here.</li>
                </ol>
                <div className="mt-3 bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs text-gray-700 flex items-start">
                  <ShieldIcon size={16} className="text-teal-600 mr-2 mt-0.5" />
                  Use a clean, flat surface. Let the card dry fully before sealing to avoid smearing.
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white flex items-center justify-center shadow">
                  <SmartphoneIcon size={18} />
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">Phone‑read</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Urine strips</h3>
              <p className="text-gray-700 mb-4">Pee on the strip and scan a photo with your phone.</p>
              <p className="text-gray-600">Checks: LH, glucose, ketones, and more.</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">How to do it at home</h4>
                <ol className="list-decimal pl-5 space-y-1 text-gray-700 text-sm">
                  <li className="flex items-start"><TimerIcon size={16} className="mr-2 mt-0.5 text-blue-600" />Use first‑morning urine if possible for most accurate results.</li>
                  <li className="flex items-start"><DropletIcon size={16} className="mr-2 mt-0.5 text-blue-600" />Dip the strip for the exact seconds specified by your brand.</li>
                  <li className="flex items-start"><TimerIcon size={16} className="mr-2 mt-0.5 text-blue-600" />Lay flat on a clean surface and wait the indicated read time.</li>
                  <li className="flex items-start"><SmartphoneIcon size={16} className="mr-2 mt-0.5 text-blue-600" />In good lighting, take a photo or scan with the brand’s app/your phone.</li>
                  <li className="flex items-start"><CameraIcon size={16} className="mr-2 mt-0.5 text-blue-600" />Upload the photo here; avoid shadows and color filters.</li>
                </ol>
                <div className="mt-3 bg-blue-50 border border-blue-100 rounded-lg p-3 text-xs text-blue-900 flex items-start">
                  <ShieldIcon size={16} className="text-blue-600 mr-2 mt-0.5" />
                  Read within the exact time window; late readings may be inaccurate.
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white flex items-center justify-center shadow">
                  <FlaskConicalIcon size={18} />
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Mail‑in</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Saliva kits</h3>
              <p className="text-gray-700 mb-4">Spit into a tube and send to a lab.</p>
              <p className="text-gray-600">Checks: cortisol (stress). Sex hormones are possible but less accurate.</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">How to do it at home</h4>
                <ol className="list-decimal pl-5 space-y-1 text-gray-700 text-sm">
                  <li className="flex items-start"><TimerIcon size={16} className="mr-2 mt-0.5 text-teal-600" />Avoid eating, drinking, brushing teeth, or gum for 30 minutes before.</li>
                  <li className="flex items-start"><FlaskConicalIcon size={16} className="mr-2 mt-0.5 text-teal-600" />Collect saliva up to the fill line as instructed; cap tightly.</li>
                  <li className="flex items-start"><TagIcon size={16} className="mr-2 mt-0.5 text-teal-600" />Label with name, date, and collection time (important for cortisol).</li>
                  <li className="flex items-start"><PackageIcon size={16} className="mr-2 mt-0.5 text-teal-600" />Place tube in the biohazard bag and prepaid mailer; send to the lab.</li>
                  <li className="flex items-start"><TimerIcon size={16} className="mr-2 mt-0.5 text-teal-600" />Note time of day in the app when uploading for better interpretation.</li>
                </ol>
                <div className="mt-3 bg-emerald-50 border border-emerald-100 rounded-lg p-3 text-xs text-emerald-900 flex items-start">
                  <ShieldIcon size={16} className="text-emerald-600 mr-2 mt-0.5" />
                  Collect at consistent times if testing multiple samples for cortisol rhythm.
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-slate-600 to-indigo-600 text-white flex items-center justify-center shadow">
                  <ActivityIcon size={18} />
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">Devices</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">4. Consumer devices</h3>
              <p className="text-gray-700 mb-4">Use weight scales, BP cuffs, sleep trackers, and step counters.</p>
              <p className="text-gray-600">Not labs, but excellent for trends in PCOS.</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">How to do it at home</h4>
                <ol className="list-decimal pl-5 space-y-1 text-gray-700 text-sm">
                  <li className="flex items-start"><ActivityIcon size={16} className="mr-2 mt-0.5 text-gray-700" />Weigh at the same time daily (after restroom, before breakfast) for consistency.</li>
                  <li className="flex items-start"><HeartIcon size={16} className="mr-2 mt-0.5 text-red-500" />For BP: sit 5 minutes, feet flat, arm supported; take 2 readings 1 minute apart.</li>
                  <li className="flex items-start"><MoonIcon size={16} className="mr-2 mt-0.5 text-indigo-600" />Wear your sleep/fitness tracker nightly and keep it charged.</li>
                  <li className="flex items-start"><UploadCloudIcon size={16} className="mr-2 mt-0.5 text-teal-600" />Sync devices weekly; export screenshots or data and upload here.</li>
                </ol>
                <div className="mt-3 bg-indigo-50 border border-indigo-100 rounded-lg p-3 text-xs text-indigo-900 flex items-start">
                  <ShieldIcon size={16} className="text-indigo-600 mr-2 mt-0.5" />
                  Log readings at consistent times to improve trend accuracy.
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-slate-400 to-slate-600 text-white flex items-center justify-center shadow">
                  <FileTextIcon size={18} />
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-slate-50 text-slate-700 border border-slate-200">Upload</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">5. Clinic results</h3>
              <p className="text-gray-700 mb-4">Upload photos or PDFs of AMH, testosterone, insulin, cholesterol, etc.</p>
              <p className="text-gray-600">Your app still performs the smart trend analysis.</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">How to share results</h4>
                <ol className="list-decimal pl-5 space-y-1 text-gray-700 text-sm">
                  <li className="flex items-start"><FileTextIcon size={16} className="mr-2 mt-0.5 text-gray-700" />Ask your clinic or lab for a PDF or take clear photos of the report.</li>
                  <li className="flex items-start"><FileTextIcon size={16} className="mr-2 mt-0.5 text-gray-700" />Ensure your name, date, and test names/values are visible.</li>
                  <li className="flex items-start"><UploadIcon size={16} className="mr-2 mt-0.5 text-teal-600" />Upload the file or photos here; use good lighting and flat angle.</li>
                  <li className="flex items-start"><Edit3Icon size={16} className="mr-2 mt-0.5 text-gray-700" />Manually enter key numbers if any values are hard to read.</li>
                </ol>
                <div className="mt-3 bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-800 flex items-start">
                  <ShieldIcon size={16} className="text-slate-600 mr-2 mt-0.5" />
                  Hide sensitive identifiers if sharing screenshots publicly.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App role */}
      {/* <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Your app’s role (the magic part)</h2>
            <ul className="space-y-3">
              <li className="flex items-start"><CheckCircle2Icon size={20} className="text-teal-600 mt-0.5 mr-3" /><span>Collect numbers (manual entry, photo scan, phone test, or lab upload).</span></li>
              <li className="flex items-start"><CheckCircle2Icon size={20} className="text-teal-600 mt-0.5 mr-3" /><span>Normalize units (e.g., mg/dL vs mmol/L).</span></li>
              <li className="flex items-start"><CheckCircle2Icon size={20} className="text-teal-600 mt-0.5 mr-3" /><span>Spot trends (e.g., “your HbA1c has gone up 0.3 in 3 months”).</span></li>
              <li className="flex items-start"><CheckCircle2Icon size={20} className="text-teal-600 mt-0.5 mr-3" /><span>Flag changes (color‑coded alerts, arrows, charts).</span></li>
              <li className="flex items-start"><CheckCircle2Icon size={20} className="text-teal-600 mt-0.5 mr-3" /><span>Compare with peers (see where you stand vs similar users).</span></li>
              <li className="flex items-start"><CheckCircle2Icon size={20} className="text-teal-600 mt-0.5 mr-3" /><span>Generate reports (PDFs for doctor visits).</span></li>
            </ul>
          </div>
        </div>
      </section> */}

      {/* Submission form */}
      <section id="upload" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Upload your sample images and details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                  <input
                    type="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Test category</label>
                  <select
                    value={testCategory}
                    onChange={(e) => setTestCategory(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="finger-prick">Finger‑prick blood card</option>
                    <option value="urine-strip">Urine strip</option>
                    <option value="saliva">Saliva kit</option>
                    <option value="device">Consumer device</option>
                    <option value="clinic">Clinic lab result</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g., Morning sample, fasting, 2nd day of cycle"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sample images</label>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50">
                  <UploadIcon className="text-gray-500 mb-2" />
                  <p className="text-gray-600 mb-2">{uploadHelpText}</p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFilesSelected(e.target.files)}
                    className="hidden"
                    id="sample-upload-input"
                  />
                  <label htmlFor="sample-upload-input" className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 cursor-pointer transition-colors">
                    Choose images
                  </label>
                </div>

                {uploadedImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {uploadedImages.map((img) => (
                      <div key={img.id} className="relative group">
                        <img src={img.previewUrl} alt={img.file.name} className="w-full h-32 object-cover rounded-lg border border-gray-200" />
                        <button
                          type="button"
                          onClick={() => removeImage(img.id)}
                          className="absolute top-2 right-2 bg-white/90 hover:bg-white text-gray-700 rounded-full px-2 py-0.5 text-xs shadow"
                        >
                          Remove
                        </button>
                        <div className="absolute bottom-2 left-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded flex items-center">
                          <FileImageIcon size={12} className="mr-1" /> {Math.round(img.file.size / 1024)} KB
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-2.5 rounded-lg bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600 shadow-md"
                >
                  Submit
                  <ArrowRightIcon size={18} className="ml-2" />
                </button>
              </div>

              {isSubmitted && (
                <div className="text-teal-700 bg-teal-50 border border-teal-200 rounded-lg p-3">
                  Submission received. We will process your details and images.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default AtHomeTesting;


