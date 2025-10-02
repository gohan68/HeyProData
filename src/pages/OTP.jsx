import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from '../hooks/use-toast';

const OTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'example@gmail.com';
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 4) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    
    if (otpValue.length !== 5) {
      toast({
        title: 'Invalid OTP',
        description: 'Please enter all 5 digits',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    // Mock OTP verification
    setTimeout(() => {
      setIsLoading(false);
      navigate('/onboarding/name');
    }, 800);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{
        background: 'conic-gradient(from 180deg at 50% 50%, #FA6E80 0deg, #6A89BE 144deg, #85AAB7 216deg, #31A7AC 360deg)'
      }}
    >
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        {/* Logo */}
        <div className="mb-8">
          <img 
            src="https://customer-assets.emergentagent.com/job_2a9bf250-13c7-456d-9a61-1240d767c09d/artifacts/97u04lh8_hpd.png" 
            alt="HeyProData" 
            className="h-12 mb-8"
          />
          <h1 className="text-3xl font-normal text-gray-900 mb-2">Enter Your OTP</h1>
          <p className="text-gray-500">
            Your One-Time Password (OTP) has been shared to your mail Id - <span className="text-gray-900 font-medium">{email}</span>
          </p>
        </div>

        {/* OTP Input */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-4">
            {otp.map((digit, index) => (
              <Input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-16 h-20 text-center text-2xl font-semibold border-2 border-gray-300 rounded-xl focus:border-[#FA6E80] focus:ring-[#FA6E80] transition-all duration-300"
              />
            ))}
          </div>

          {/* Warning Message */}
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <span className="text-yellow-500">⚠</span>
            <p>don't share your OTP to anyone until it is under your authentication</p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-[63px] bg-[#FA6E80] hover:bg-[#f95569] text-white text-lg font-medium rounded-[15px] transition-all duration-300 ease-out transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
          >
            {isLoading ? 'Verifying...' : 'Submit'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default OTP;