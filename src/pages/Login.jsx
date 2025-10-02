import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Checkbox } from '../components/ui/checkbox';
import { mockLogin, mockGoogleAuth, mockAppleAuth } from '../utils/mockAuth';
import { toast } from '../hooks/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!username.trim()) {
      newErrors.username = 'Please fill this field';
    }
    if (!password.trim()) {
      newErrors.password = 'Please fill this field';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await mockLogin(username, password, rememberPassword);
      navigate('/otp', { state: { email: username } });
    } catch (error) {
      toast({
        title: 'Login failed',
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
      {/* Left side - Gradient Background */}
      <div className="hidden md:flex md:w-1/2 items-center justify-end pl-8 pr-0 py-8">
        <div 
          className="w-full h-full max-w-[450px] max-h-[721px] rounded-[68px]"
          style={{
            background: 'conic-gradient(from 180deg at 50% 50%, #FA6E80 0deg, #6A89BE 144deg, #85AAB7 216deg, #31A7AC 360deg)'
          }}
        >
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-start px-4 sm:px-6 md:pl-0 py-6 md:py-12 bg-white">
        <div className="w-full max-w-md md:max-w-lg md:pl-12 lg:pl-16 xl:pl-20">
          {/* Logo */}
          <div className="mb-6 md:mb-12">
            <img 
              src="https://customer-assets.emergentagent.com/job_2a9bf250-13c7-456d-9a61-1240d767c09d/artifacts/97u04lh8_hpd.png" 
              alt="HeyProData" 
              className="h-8 md:h-12 mb-4 md:mb-8"
            />
            <h1 className="text-2xl md:text-4xl font-light text-gray-900">Login</h1>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
            {/* Username Field */}
            <div>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errors.username) setErrors({ ...errors, username: '' });
                }}
                className="h-11 md:h-14 text-sm md:text-base border-gray-300 rounded-xl focus:border-[#FA6E80] focus:ring-[#FA6E80] transition-all duration-300"
              />
              {errors.username && (
                <p className="text-xs md:text-sm text-red-500 mt-2">{errors.username}</p>
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

            {/* Remember Password Checkbox */}
            <div className="flex items-center space-x-2 md:space-x-3">
              <Checkbox
                id="remember"
                checked={rememberPassword}
                onCheckedChange={setRememberPassword}
                className="border-gray-400 data-[state=checked]:bg-[#FA6E80] data-[state=checked]:border-[#FA6E80]"
              />
              <label
                htmlFor="remember"
                className="text-xs md:text-sm text-gray-600 cursor-pointer select-none"
              >
                remember the password
              </label>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-[52px] md:h-[63px] bg-[#FA6E80] hover:bg-[#f95569] text-white text-sm md:text-lg font-medium rounded-[15px] transition-all duration-300 ease-out transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
            >
              {isLoading ? 'Loading...' : 'Login'}
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
                className="w-[70px] md:w-[100px] h-[35px] md:h-[50px] object-contain"
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
                className="w-[70px] md:w-[100px] h-[35px] md:h-[50px] object-contain"
              />
            </Button>
          </div>

          {/* Sign in Link */}
          <div className="text-center mt-5 md:mt-8">
            <span className="text-gray-600 text-xs md:text-base">Don't have an account? </span>
            <button
              onClick={() => navigate('/signin')}
              className="text-[#4A90E2] font-medium hover:underline transition-all duration-200 text-xs md:text-base"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;