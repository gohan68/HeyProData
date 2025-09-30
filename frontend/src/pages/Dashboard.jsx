import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { LogOut } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    // Check if user is authenticated
    const mockUser = localStorage.getItem('mockUser');
    const photo = localStorage.getItem('profilePhoto');
    
    if (!mockUser) {
      navigate('/login');
      return;
    }
    
    setUserData(JSON.parse(mockUser));
    setProfilePhoto(photo);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('mockUser');
    localStorage.removeItem('profilePhoto');
    navigate('/login');
  };

  if (!userData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <img 
            src="https://customer-assets.emergentagent.com/job_2a9bf250-13c7-456d-9a61-1240d767c09d/artifacts/97u04lh8_hpd.png" 
            alt="HeyProData" 
            className="h-8"
          />
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2 border-gray-300 hover:border-[#FA6E80] hover:text-[#FA6E80] transition-all duration-300"
          >
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center">
            {/* Profile Photo */}
            {profilePhoto ? (
              <img
                src={profilePhoto}
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-[#FA6E80] shadow-lg object-cover"
              />
            ) : (
              <div className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-gray-300 bg-gradient-to-br from-[#FA6E80] to-[#5DBED8] flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                {userData.username?.[0]?.toUpperCase() || userData.email?.[0]?.toUpperCase() || 'U'}
              </div>
            )}

            {/* Welcome Message */}
            <h1 className="text-4xl font-light text-gray-900 mb-2">
              Welcome to HeyProData!
            </h1>
            <p className="text-gray-600 mb-8">
              You're successfully logged in
            </p>

            {/* User Info */}
            <div className="max-w-md mx-auto bg-gray-50 rounded-xl p-6 text-left">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h2>
              <div className="space-y-3">
                {userData.username && (
                  <div>
                    <span className="text-sm text-gray-500">Username:</span>
                    <p className="text-gray-900 font-medium">{userData.username}</p>
                  </div>
                )}
                {userData.email && (
                  <div>
                    <span className="text-sm text-gray-500">Email:</span>
                    <p className="text-gray-900 font-medium">{userData.email}</p>
                  </div>
                )}
                {userData.provider && (
                  <div>
                    <span className="text-sm text-gray-500">Login Method:</span>
                    <p className="text-gray-900 font-medium capitalize">{userData.provider}</p>
                  </div>
                )}
              </div>
            </div>

            <p className="mt-8 text-sm text-gray-500">
              This is a mock implementation. Your backend integration is ready to be connected.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;