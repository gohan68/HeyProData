import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Input } from '../components/ui/input';
import { ChevronLeft } from 'lucide-react';
import { toast } from '../hooks/use-toast';
import ProgressBar from '../components/ProgressBar';

const OnboardingLocation = () => {
  const navigate = useNavigate();
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const countries = ['United States', 'United Kingdom', 'Canada', 'Australia', 'India', 'Germany', 'France'];
  const states = ['California', 'New York', 'Texas', 'Florida', 'Illinois', 'Pennsylvania'];

  const validateForm = () => {
    const newErrors = {};
    if (!country) newErrors.country = 'Please select a country';
    if (!state) newErrors.state = 'Please select a state';
    if (!city.trim()) newErrors.city = 'Please fill this field';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    const onboardingData = JSON.parse(localStorage.getItem('onboardingData') || '{}');
    onboardingData.country = country;
    onboardingData.state = state;
    onboardingData.city = city;
    localStorage.setItem('onboardingData', JSON.stringify(onboardingData));

    setTimeout(() => {
      setIsLoading(false);
      navigate('/onboarding/username');
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
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          back
        </button>

        {/* Logo */}
        <div className="mb-8">
          <img 
            src="https://customer-assets.emergentagent.com/job_2a9bf250-13c7-456d-9a61-1240d767c09d/artifacts/97u04lh8_hpd.png" 
            alt="HeyProData" 
            className="h-12 mb-6"
          />
          <p className="text-gray-500 text-base">
            Complete your profile with your location details
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger className="h-14 text-base border-2 border-gray-300 rounded-xl focus:border-[#FA6E80] focus:ring-[#FA6E80]">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && (
              <p className="text-sm text-red-500 mt-2">{errors.country}</p>
            )}
          </div>

          <div>
            <Select value={state} onValueChange={setState}>
              <SelectTrigger className="h-14 text-base border-2 border-gray-300 rounded-xl focus:border-[#FA6E80] focus:ring-[#FA6E80]">
                <SelectValue placeholder="State" />
              </SelectTrigger>
              <SelectContent>
                {states.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.state && (
              <p className="text-sm text-red-500 mt-2">{errors.state}</p>
            )}
          </div>

          <div>
            <Input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                if (errors.city) setErrors({ ...errors, city: '' });
              }}
              className="h-14 text-base border-2 border-gray-300 rounded-xl focus:border-[#FA6E80] focus:ring-[#FA6E80] transition-all duration-300"
            />
            {errors.city && (
              <p className="text-sm text-red-500 mt-2">{errors.city}</p>
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

      {/* Progress Bar - 50% */}
      <ProgressBar progress={50} />
    </div>
  );
};

export default OnboardingLocation;