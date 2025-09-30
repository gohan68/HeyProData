import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { mockSignIn, mockGoogleAuth, mockAppleAuth, validatePassword } from '../utils/mockAuth';
import { toast } from '../hooks/use-toast';
import { Check } from 'lucide-react';

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
      navigate('/profile-photo');
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
      navigate('/profile-photo');
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
      navigate('/profile-photo');
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
    <div className="min-h-screen flex">
      {/* Left side - Sign In Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12 bg-white">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-12">
            <img 
              src="https://customer-assets.emergentagent.com/job_2a9bf250-13c7-456d-9a61-1240d767c09d/artifacts/97u04lh8_hpd.png" 
              alt="HeyProData" 
              className="h-12 mb-8"
            />
            <h1 className="text-4xl font-light text-gray-900">Sign in</h1>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSignIn} className="space-y-6">
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
                className="h-14 text-base border-gray-300 rounded-xl focus:border-[#FA6E80] focus:ring-[#FA6E80] transition-all duration-300"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-2">{errors.email}</p>
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
                className="h-14 text-base border-gray-300 rounded-xl focus:border-[#FA6E80] focus:ring-[#FA6E80] transition-all duration-300"
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-2">{errors.password}</p>
              )}
            </div>

            {/* Password Requirements */}
            {password && (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${passwordValidation.hasUppercase ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <span className={`text-sm ${passwordValidation.hasUppercase ? 'text-green-500' : 'text-gray-500'}`}>
                    Password must contain at least one <span className="font-medium">uppercase</span>
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${passwordValidation.hasNumber ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <span className={`text-sm ${passwordValidation.hasNumber ? 'text-green-500' : 'text-gray-500'}`}>
                    Password must contain at least one <span className="font-medium">number</span>
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${passwordValidation.hasSpecialChar ? 'bg-red-500' : 'bg-gray-400'}`}></div>
                  <span className={`text-sm ${passwordValidation.hasSpecialChar ? 'text-red-500' : 'text-gray-500'}`}>
                    Password must contain at least one <span className="font-medium">special character</span>
                  </span>
                </div>
              </div>
            )}

            {/* Sign In Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-[63px] bg-[#FA6E80] hover:bg-[#f95569] text-white text-lg font-medium rounded-[15px] transition-all duration-300 ease-out transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
            >
              {isLoading ? 'Loading...' : 'Sign in'}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex gap-4 justify-center">
            <Button
              type="button"
              onClick={handleGoogleAuth}
              disabled={isLoading}
              className="w-[204px] h-[85px] bg-white border border-gray-300 rounded-[15px] hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
            >
              <img 
                src="https://customer-assets.emergentagent.com/job_2a9bf250-13c7-456d-9a61-1240d767c09d/artifacts/aed55168_Google.png" 
                alt="Google" 
                className="w-12 h-12"
              />
            </Button>

            <Button
              type="button"
              onClick={handleAppleAuth}
              disabled={isLoading}
              className="w-[204px] h-[85px] bg-white border border-gray-300 rounded-[15px] hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
            >
              <img 
                src="https://customer-assets.emergentagent.com/job_2a9bf250-13c7-456d-9a61-1240d767c09d/artifacts/ipfvhgr1_Apple.png" 
                alt="Apple" 
                className="w-12 h-12"
              />
            </Button>
          </div>

          {/* Login Link */}
          <div className="text-center mt-8">
            <span className="text-gray-600">Already have an account? </span>
            <button
              onClick={() => navigate('/login')}
              className="text-[#4A90E2] font-medium hover:underline transition-all duration-200"
            >
              Login
            </button>
          </div>
        </div>
      </div>

      {/* Right side - Gradient Background */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-[#5DBED8] via-[#E091B3] to-[#6B8FD8] opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-[#6B8FD8] via-transparent to-[#E091B3] opacity-50"></div>
      </div>
    </div>
  );
};

export default SignIn;