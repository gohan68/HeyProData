import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { mockSignIn, mockGoogleAuth, mockAppleAuth, validatePassword } from '../utils/mockAuth';
import { toast } from '../hooks/use-toast';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false
  });

  // Real-time password validation
  useEffect(() => {
    if (password) {
      setPasswordValidation(validatePassword(password));
    } else {
      setPasswordValidation({
        hasUppercase: false,
        hasNumber: false,
        hasSpecialChar: false
      });
    }
  }, [password]);

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Please fill this field';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!password.trim()) {
      newErrors.password = 'Please fill this field';
    } else if (!passwordValidation.hasUppercase || !passwordValidation.hasNumber || !passwordValidation.hasSpecialChar) {
      newErrors.password = 'Password does not meet all requirements';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await mockSignIn(email, password);
      navigate('/otp', { state: { email } });
    } catch (error) {
      toast({
        title: 'Sign in failed',
        description: error.message || 'Please try again',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      await mockGoogleAuth();
      navigate('/otp', { state: { email: 'user@gmail.com' } });
    } catch (error) {
      toast({
        title: 'Authentication failed',
        description: 'Please try again',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleAuth = async () => {
    setIsLoading(true);
    try {
      await mockAppleAuth();
      navigate('/otp', { state: { email: 'user@icloud.com' } });
    } catch (error) {
      toast({
        title: 'Authentication failed',
        description: 'Please try again',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white overflow-hidden">
      {/* Left side - Sign In Form */}
      <div className="w-full md:w-1/2 flex items-center justify-end px-4 sm:px-6 md:pr-0 py-6 md:py-12 bg-white">
        <div className="w-full max-w-md md:max-w-lg md:pr-12 lg:pr-16 xl:pr-20">
          {/* Logo */}
          <div className="mb-6 md:mb-12">
            <img 
              src="https://customer-assets.emergentagent.com/job_2a9bf250-13c7-456d-9a61-1240d767c09d/artifacts/97u04lh8_hpd.png" 
              alt="HeyProData" 
              className="h-8 md:h-12 mb-4 md:mb-8"
            />
            <h1 className="text-2xl md:text-4xl font-light text-gray-900">Sign in</h1>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSignIn} className="space-y-4 md:space-y-6">
            {/* Email Field */}
            <div>
              <Input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                className="h-11 md:h-14 text-sm md:text-base border-gray-300 rounded-xl focus:border-[#FA6E80] focus:ring-[#FA6E80] transition-all duration-300"
              />
              {errors.email && (
                <p className="text-xs md:text-sm text-red-500 mt-2">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: '' });
                }}
                className="h-11 md:h-14 text-sm md:text-base border-gray-300 rounded-xl focus:border-[#FA6E80] focus:ring-[#FA6E80] transition-all duration-300"
              />
              {errors.password && (
                <p className="text-xs md:text-sm text-red-500 mt-2">{errors.password}</p>
              )}
            </div>

            {/* Password Requirements */}
            {password && (
              <div className="space-y-1.5 md:space-y-2">
                <div className="flex items-center space-x-2">
                  <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${passwordValidation.hasUppercase ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <span className={`text-[10px] md:text-sm ${passwordValidation.hasUppercase ? 'text-green-500' : 'text-gray-500'}`}>
                    Password must contain at least one <span className="font-medium">uppercase</span>
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${passwordValidation.hasNumber ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <span className={`text-[10px] md:text-sm ${passwordValidation.hasNumber ? 'text-green-500' : 'text-gray-500'}`}>
                    Password must contain at least one <span className="font-medium">number</span>
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${passwordValidation.hasSpecialChar ? 'bg-red-500' : 'bg-gray-400'}`}></div>
                  <span className={`text-[10px] md:text-sm ${passwordValidation.hasSpecialChar ? 'text-red-500' : 'text-gray-500'}`}>
                    Password must contain at least one <span className="font-medium">special character</span>
                  </span>
                </div>
              </div>
            )}

            {/* Sign In Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-[52px] md:h-[63px] bg-[#FA6E80] hover:bg-[#f95569] text-white text-sm md:text-lg font-medium rounded-[15px] transition-all duration-300 ease-out transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
            >
              {isLoading ? 'Loading...' : 'Sign in'}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-5 md:my-8">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 md:px-4 text-gray-500 text-xs md:text-sm">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex gap-2 md:gap-4 justify-center">
            <Button
              type="button"
              onClick={handleGoogleAuth}
              disabled={isLoading}
              className="w-[140px] md:w-[204px] h-[60px] md:h-[85px] bg-white border border-gray-300 rounded-[12px] md:rounded-[15px] hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md flex items-center justify-center p-3 md:p-6"
            >
              <img 
                src="https://customer-assets.emergentagent.com/job_2a9bf250-13c7-456d-9a61-1240d767c09d/artifacts/aed55168_Google.png" 
                alt="Google" 
                className="w-[70px] md:w-[100px] h-[35px] md:h-[51px] object-contain"
              />
            </Button>

            <Button
              type="button"
              onClick={handleAppleAuth}
              disabled={isLoading}
              className="w-[140px] md:w-[204px] h-[60px] md:h-[85px] bg-white border border-gray-300 rounded-[12px] md:rounded-[15px] hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md flex items-center justify-center p-3 md:p-6"
            >
              <img 
                src="https://customer-assets.emergentagent.com/job_2a9bf250-13c7-456d-9a61-1240d767c09d/artifacts/ipfvhgr1_Apple.png" 
                alt="Apple" 
                className="w-[70px] md:w-[100px] h-[35px] md:h-[51px] object-contain"
              />
            </Button>
          </div>

          {/* Login Link */}
          <div className="text-center mt-5 md:mt-8">
            <span className="text-gray-600 text-xs md:text-base">Already have an account? </span>
            <button
              onClick={() => navigate('/login')}
              className="text-[#4A90E2] font-medium hover:underline transition-all duration-200 text-xs md:text-base"
            >
              Login
            </button>
          </div>
        </div>
      </div>

      {/* Right side - Gradient Background */}
      <div className="hidden md:flex md:w-1/2 items-center justify-start pl-0 pr-8 py-8">
        <div 
          className="w-full h-full max-w-[450px] max-h-[721px] rounded-[68px]"
          style={{
            background: 'conic-gradient(from 180deg at 50% 50%, #FA6E80 0deg, #6A89BE 144deg, #85AAB7 216deg, #31A7AC 360deg)'
          }}
        >
        </div>
      </div>
    </div>
  );
};

export default SignIn;