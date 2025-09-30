import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from '../hooks/use-toast';
import ProgressBar from '../components/ProgressBar';

const OnboardingUsername = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!firstName.trim()) {
      newErrors.firstName = 'Please fill this field';
    }
    if (!lastName.trim()) {
      newErrors.lastName = 'Please fill this field';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSkip = () => {
    navigate('/onboarding/profile-photo');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    const onboardingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
    onboardingData.aliasFirstName = firstName;
    onboardingData.aliasLastName = lastName;
    localStorage.setItem('onboardingData', JSON.stringify(onboardingData));

    setTimeout(() => {
      setIsLoading(false);
      navigate('/onboarding/profile-photo');
    }, 500);
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
      style={{
        background: 'conic-gradient(from 180deg at 50% 50%, #FA6E80 0deg, #6A89BE 144deg, #85AAB7 216deg, #31A7AC 360deg)'
      }}
    >
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 mb-8 relative">
        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          Skip
        </button>

        {/* Logo */}
        <div className="mb-8">
          <img 
            src="https://customer-assets.emergentagent.com/job_2a9bf250-13c7-456d-9a61-1240d767c09d/artifacts/97u04lh8_hpd.png" 
            alt="HeyProData" 
            className="h-12 mb-6"
          />
          <p className="text-gray-500 text-base">
            How are know to this world, give an alias name that is recognized by people
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                if (errors.firstName) setErrors({ ...errors, firstName: '' });
              }}
              className="h-14 text-base border-2 border-gray-300 rounded-xl focus:border-[#FA6E80] focus:ring-[#FA6E80] transition-all duration-300"
            />
            {errors.firstName && (
              <p className="text-sm text-red-500 mt-2">{errors.firstName}</p>
            )}
          </div>

          <div>
            <Input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                if (errors.lastName) setErrors({ ...errors, lastName: '' });
              }}
              className="h-14 text-base border-2 border-gray-300 rounded-xl focus:border-[#FA6E80] focus:ring-[#FA6E80] transition-all duration-300"
            />
            {errors.lastName && (
              <p className="text-sm text-red-500 mt-2">{errors.lastName}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-[63px] bg-[#FA6E80] hover:bg-[#f95569] text-white text-lg font-medium rounded-[15px] transition-all duration-300 ease-out transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
          >
            {isLoading ? 'Loading...' : 'Next'}
          </Button>
        </form>
      </div>

      {/* Progress Bar - 75% */}
      <ProgressBar progress={75} />
    </div>
  );
};

export default OnboardingUsername;