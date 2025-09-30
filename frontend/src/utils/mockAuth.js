// Mock authentication handlers for frontend-only implementation

export const mockLogin = async (username, password, rememberPassword) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username && password) {
        // Store mock user data
        const mockUser = {
          username,
          rememberPassword,
          loginTime: new Date().toISOString()
        };
        localStorage.setItem('mockUser', JSON.stringify(mockUser));
        resolve({ success: true, user: mockUser });
      } else {
        reject({ success: false, message: 'Invalid credentials' });
      }
    }, 800);
  });
};

export const mockSignIn = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        // Store mock user data
        const mockUser = {
          email,
          signInTime: new Date().toISOString()
        };
        localStorage.setItem('mockUser', JSON.stringify(mockUser));
        resolve({ success: true, user: mockUser });
      } else {
        reject({ success: false, message: 'Sign in failed' });
      }
    }, 800);
  });
};

export const mockGoogleAuth = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockUser = {
        email: 'user@gmail.com',
        provider: 'google',
        loginTime: new Date().toISOString()
      };
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      resolve({ success: true, user: mockUser });
    }, 1000);
  });
};

export const mockAppleAuth = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockUser = {
        email: 'user@icloud.com',
        provider: 'apple',
        loginTime: new Date().toISOString()
      };
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      resolve({ success: true, user: mockUser });
    }, 1000);
  });
};

// Password validation utilities
export const validatePassword = (password) => {
  return {
    hasUppercase: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  };
};