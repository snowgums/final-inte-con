import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Signup() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
    setError,
  } = useForm();

  const subjectOptions = [
    "Math", "Science", "English", "Filipino", "Araling Panlipunan",
    "Edukasyong Pantahanan at Pangkabuhayan (EPP)",
    "MAPEH", "Values Education", "Mother Tongue", "Reading", "Writing"
  ];

  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleSubject = (subject) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
    } else if (selectedSubjects.length < 3) {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const nextStep = async () => {
    const valid = await trigger();
    if (valid) setStep(step + 1);
  };

  const onSubmit = async (data) => {
    if (step === 2 && (selectedSubjects.length === 0 || selectedSubjects.length > 3)) {
      setError("subjects", { type: "manual" });
      return;
    }

    if (step < 3) {
      const valid = await trigger();
      if (valid) setStep(3);
      return;
    }

    const formData = { ...data, subjects: selectedSubjects };
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#98CFA4] to-[#58A8B6] text-[#2f2f2f] px-6 overflow-hidden">

      {/* Background Branding Words */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {Array.from({ length: 9 }).map((_, idx) => (
          <span
            key={idx}
            className="absolute text-[4rem] sm:text-[6rem] font-extrabold text-white opacity-10"
            style={{
              top: `${(idx % 3) * 33}%`,
              left: `${(Math.floor(idx / 3) * 33)}%`,
              transform: `rotate(${(idx % 2 === 0) ? -15 : 15}deg)`,
              whiteSpace: 'nowrap',
            }}
          >
            Intellect Connect
          </span>
        ))}
      </div>

      <div className="relative z-10 bg-white rounded-xl shadow-lg w-full max-w-5xl px-8 pt-6 pb-8">

        {/* Header (Hide after submission) */}
        {!isSubmitted && (
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img src="/logo.jpg" alt="Logo" className="h-10 w-10 rounded-full bg-white p-1" />
              <h1 className="text-xl font-bold text-[#58A8B6]">Intellect Connect</h1>
            </div>
            <a
              href="/"
              className="text-sm bg-[#58A8B6] text-white px-4 py-2 rounded-full hover:bg-[#4aa0a4] transition"
            >
              ← Back to Home
            </a>
          </div>
        )}

        {/* Confirmation Screen */}
        {isSubmitted ? (
          <div className="text-center py-16">
            <h2 className="text-3xl font-bold text-[#58A8B6] mb-4">Thank you for signing up!</h2>
            <p className="text-gray-700 text-lg">
              Our team will review your credentials and notify you once your tutor profile has been verified.
            </p>
          </div>
        ) : (
          <>
            {/* Step Title */}
            <h2 className="text-2xl font-bold text-center text-[#58A8B6] mb-4">Tutor Sign Up</h2>

            {/* Stepper */}
            <div className="flex items-center justify-center mb-8 space-x-4">
              {[1, 2, 3].map((s, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm 
                    ${step >= s ? 'bg-[#58A8B6] text-white' : 'bg-gray-300 text-gray-600'}`}>
                    {s}
                  </div>
                  {s !== 3 && (
                    <div className={`w-10 h-1 mx-2 ${step > s ? 'bg-[#58A8B6]' : 'bg-gray-300'}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

              {/* Step 1: Personal Info */}
              {step === 1 && (
                <div className="grid grid-cols-2 gap-4">
                  <input type="email" placeholder="Email" {...register("email", { required: true })} className={`input-field ${errors.email ? 'border-red-500' : ''}`} />
                  <input type="password" placeholder="Password" {...register("password", { required: true })} className={`input-field ${errors.password ? 'border-red-500' : ''}`} />
                  <input type="text" placeholder="Full Name" {...register("fullName", { required: true })} className={`input-field ${errors.fullName ? 'border-red-500' : ''}`} />
                  <input type="date" {...register("birthdate", { required: true })} className={`input-field ${errors.birthdate ? 'border-red-500' : ''}`} />
                  <input type="number" placeholder="Age" {...register("age", { required: true })} className={`input-field ${errors.age ? 'border-red-500' : ''}`} />
                  <select {...register("gender", { required: true })} className={`input-field ${errors.gender ? 'border-red-500' : ''}`}>
                    <option value="">Select Gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="prefer_not">Prefer not to say</option>
                  </select>
                  <input type="text" placeholder="Address" {...register("address", { required: true })} className={`input-field col-span-2 ${errors.address ? 'border-red-500' : ''}`} />
                </div>
              )}

              {/* Step 2: Educational Background */}
              {step === 2 && (
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="School Attended" {...register("school", { required: true })} className={`input-field ${errors.school ? 'border-red-500' : ''}`} />
                  <select {...register("attainment", { required: true })} className={`input-field ${errors.attainment ? 'border-red-500' : ''}`}>
                    <option value="">Select Highest Attainment</option>
                    <option value="highschool">High School Diploma</option>
                    <option value="bachelor">Bachelor’s Degree</option>
                    <option value="master">Master’s Degree</option>
                    <option value="doctoral">Doctoral Degree</option>
                    <option value="professional">Professional Certification</option>
                    <option value="postgraduate">Post-graduate Studies</option>
                  </select>
                  <input type="number" placeholder="Years of Experience" {...register("experience", { required: true })} className={`input-field ${errors.experience ? 'border-red-500' : ''}`} />
                  <select {...register("gradeLevel", { required: true })} className={`input-field ${errors.gradeLevel ? 'border-red-500' : ''}`}>
                    <option value="">Select Grade Level</option>
                    <option value="kindergarten">Kindergarten</option>
                    <option value="grade1">Grade 1</option>
                    <option value="grade2">Grade 2</option>
                    <option value="grade3">Grade 3</option>
                    <option value="grade4">Grade 4</option>
                    <option value="grade5">Grade 5</option>
                    <option value="grade6">Grade 6</option>
                  </select>
                  <select {...register("availability", { required: true })} className={`input-field ${errors.availability ? 'border-red-500' : ''}`}>
                    <option value="">Select Availability</option>
                    <option value="Weekdays - Morning (8AM-12PM)">Weekdays - Morning (8AM-12PM)</option>
                    <option value="Weekdays - Afternoon (1PM-5PM)">Weekdays - Afternoon (1PM-5PM)</option>
                    <option value="Weekdays - Evening (6PM-9PM)">Weekdays - Evening (6PM-9PM)</option>
                    <option value="Weekends - Morning (8AM-12PM)">Weekends - Morning (8AM-12PM)</option>
                    <option value="Weekends - Afternoon (1PM-5PM)">Weekends - Afternoon (1PM-5PM)</option>
                    <option value="Flexible">Flexible</option>
                  </select>

                  {/* Multi-select subjects */}
                  <div className="col-span-2 relative">
                    <label className="block text-sm font-medium mb-1 text-[#2f2f2f]">Subjects of Expertise (Max 3)</label>
                    <button
                      type="button"
                      className="w-full input-field text-left cursor-pointer"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      {selectedSubjects.length > 0 ? selectedSubjects.join(', ') : 'Select Subjects'}
                    </button>
                    {dropdownOpen && (
                      <ul className="absolute z-10 w-full bg-white border mt-1 rounded shadow max-h-48 overflow-y-auto">
                        {subjectOptions.map((subject, idx) => (
                          <li
                            key={idx}
                            className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                              selectedSubjects.includes(subject) ? 'bg-[#e0f2f1] text-[#2f2f2f] font-medium' : ''
                            }`}
                            onClick={() => toggleSubject(subject)}
                          >
                            {subject}
                          </li>
                        ))}
                      </ul>
                    )}
                    {errors.subjects && (
                      <p className="text-red-500 text-sm mt-1">Please select up to 3 subjects.</p>
                    )}
                  </div>

                  <input type="text" placeholder="Hourly Rate (PHP)" {...register("rate", { required: true })} className={`input-field col-span-2 ${errors.rate ? 'border-red-500' : ''}`} />
                </div>
              )}

              {/* Step 3: Credential Uploads */}
              {step === 3 && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1 text-[#2f2f2f]">Valid ID <span className="text-red-500">*</span></label>
                    <input type="file" accept="image/*,application/pdf" {...register("validId", { required: true })} className={`input-field ${errors.validId ? 'border-red-500' : ''}`} />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1 text-[#2f2f2f]">Selfie with ID <span className="text-red-500">*</span></label>
                    <input type="file" accept="image/*" {...register("selfieId", { required: true })} className={`input-field ${errors.selfieId ? 'border-red-500' : ''}`} />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1 text-[#2f2f2f]">Certifications (Optional)</label>
                    <input type="file" accept="image/*,application/pdf" {...register("certifications")} className="input-field" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1 text-[#2f2f2f]">PRC / License (Optional)</label>
                    <input type="file" accept="image/*,application/pdf" {...register("prcLicense")} className="input-field" />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-6 flex justify-between">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="text-sm text-gray-500 hover:text-gray-700 transition"
                  >
                    ← Back
                  </button>
                )}
                <button
                  type={step === 3 ? "submit" : "button"}
                  onClick={step < 3 ? nextStep : undefined}
                  className="bg-[#58A8B6] text-white font-semibold px-6 py-2 rounded-full hover:bg-[#4a97a1] transition ml-auto"
                >
                  {step === 3 ? "Submit" : "Next"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
