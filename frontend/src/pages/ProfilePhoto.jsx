import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Upload } from 'lucide-react';

const ProfilePhoto = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  const handleContinue = () => {
    if (selectedImage) {
      // Store the image in localStorage for mock purposes
      localStorage.setItem('profilePhoto', previewUrl);
      navigate('/dashboard');
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{
        background: 'conic-gradient(from 180deg at 50% 50%, #FA6E80 0deg, #6A89BE 144deg, #85AAB7 216deg, #31A7AC 360deg)'
      }}
    >
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 animate-in fade-in duration-800">
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src="https://customer-assets.emergentagent.com/job_2a9bf250-13c7-456d-9a61-1240d767c09d/artifacts/97u04lh8_hpd.png" 
            alt="HeyProData" 
            className="h-10 mx-auto mb-6"
          />
          <h1 className="text-3xl font-light text-gray-900 mb-2">Upload Profile Photo</h1>
          <p className="text-gray-500">Add a photo to personalize your account</p>
        </div>

        {/* Image Upload Area */}
        <div className="mb-8">
          <label
            htmlFor="photo-upload"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-[#FA6E80] hover:bg-gray-50 transition-all duration-300"
          >
            {previewUrl ? (
              <div className="relative w-full h-full">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 rounded-2xl flex items-center justify-center">
                  <Upload className="text-white opacity-0 hover:opacity-100 transition-opacity duration-300" size={32} />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Upload className="text-gray-400 mb-4" size={48} />
                <span className="text-gray-600 font-medium mb-1">Click to upload</span>
                <span className="text-gray-400 text-sm">PNG, JPG up to 10MB</span>
              </div>
            )}
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </label>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleContinue}
            disabled={!selectedImage}
            className="w-full h-14 bg-[#FA6E80] hover:bg-[#f95569] text-white text-lg font-medium rounded-[15px] transition-all duration-300 ease-out transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Continue
          </Button>
          <Button
            onClick={handleSkip}
            variant="outline"
            className="w-full h-14 border-gray-300 text-gray-700 hover:bg-gray-50 text-lg font-medium rounded-[15px] transition-all duration-300"
          >
            Skip for now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePhoto;