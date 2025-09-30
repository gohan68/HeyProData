# HeyProData - Authentication System

## 🚀 Project Overview

A pixel-perfect authentication and onboarding system with Login, Sign in, OTP verification, multi-step onboarding flow with dynamic progress tracking, and Dashboard. Built with React, featuring mock authentication ready for backend integration.

## ✨ Features Implemented

### 1. **Login Page** (`/login`)
- Username & Password fields with validation
- "Remember the password" checkbox
- Primary login button (#FA6E80 color)
- Google & Apple OAuth placeholders (mock handlers ready)
- Form validation: Shows "Please fill this field" for empty inputs
- Smooth animations and transitions
- Redirects to Profile Photo page on success

### 2. **Sign In Page** (`/signin`)
- Email & Password fields with validation
- **Real-time password validation** showing:
  - Must contain at least one uppercase letter (green indicator)
  - Must contain at least one number (green indicator)
  - Must contain at least one special character (red indicator)
- Google & Apple OAuth placeholders
- Form validation with email format checking
- Beautiful gradient background on right side
- Redirects to Profile Photo page on success

### 3. **OTP Verification Page** (`/otp`)
- 5-digit OTP input with auto-focus
- Email display showing where OTP was sent
- Auto-advance to next input field
- Backspace navigation support
- Security warning message
- Submit button navigates to onboarding flow

### 4. **Onboarding Flow with Dynamic Progress Bar**

#### Name Page (`/onboarding/name`) - 25% Progress
- First name & Surname fields
- Form validation
- Progress bar showing 25% completion (187.5px / 750px)

#### Location Page (`/onboarding/location`) - 50% Progress
- Country dropdown (7 countries)
- State dropdown (6 states)
- City text input
- Back button to previous step
- Progress bar showing 50% completion (375px / 750px)

#### Username Page (`/onboarding/username`) - 75% Progress
- Alias first name & last name
- Skip option available
- Progress bar showing 75% completion (562.5px / 750px)

#### Profile Photo Page (`/onboarding/profile-photo`) - 100% Progress
- Drag & drop / click to upload image
- Image preview before upload
- Continue button (enabled only when image is selected)
- Skip for now option
- Stores image in localStorage (mock)
- Beautiful centered card design with gradient background

### 5. **Dashboard Page** (`/dashboard`)
- Welcome message with user info
- Displays uploaded profile photo or gradient avatar
- Account information section
- Logout functionality
- Protected route (redirects to login if not authenticated)

## 🎨 Design Specifications

### Colors
- Primary Button: `#FA6E80` (coral/pink)
- Background Gradient: `conic-gradient(from 180deg at 50% 50%, #FA6E80 0deg, #6A89BE 144deg, #85AAB7 216deg, #31A7AC 360deg)`
- Progress Bar Gradient: `linear-gradient(90deg, #FA6E80 0%, #6A89BE 43.84%, #85AAB7 65.76%, #31A7AC 109.6%)`
- Links: `#4A90E2` (blue)

### Progress Bar Specifications
- Background: 750px × 20px, border-radius 41px, border 2px, white background
- Progress Fill: Dynamic width (25% = 187.5px, 50% = 375px, 75% = 562.5px, 100% = 750px)
- Height: 20px, border-radius 10px
- Smooth transition animation (500ms ease-out)

### Button Dimensions
- Login/Sign in Button: 438px × 63px, 15px border-radius
- Google/Apple Buttons: 204px × 85px, 15px border-radius, side by side

### Animations
- Dissolve animation (800ms ease-out) on page transitions
- Hover effects with scale transforms
- Smooth transitions on all interactive elements

## 📁 File Structure

```
/app/frontend/src/
├── pages/
│   ├── Login.jsx              # Login page with username/password
│   ├── SignIn.jsx             # Sign in page with email/password & validation
│   ├── OTP.jsx                # OTP verification page
│   ├── OnboardingName.jsx     # Name input (25% progress)
│   ├── OnboardingLocation.jsx # Location selection (50% progress)
│   ├── OnboardingUsername.jsx # Username/alias input (75% progress)
│   ├── ProfilePhoto.jsx       # Profile photo upload (100% progress)
│   └── Dashboard.jsx          # Protected dashboard page
├── components/
│   ├── ProgressBar.jsx        # Dynamic progress bar component
│   └── ui/                    # Shadcn UI components
├── utils/
│   └── mockAuth.js            # Mock authentication handlers
├── App.js                     # Main routing configuration
└── App.css                    # Global styles & animations
```

## 🔧 Mock Authentication

All authentication is currently mocked and stored in `localStorage`:

### Mock Functions Available:
- `mockLogin(username, password, rememberPassword)` - Handles login
- `mockSignIn(email, password)` - Handles sign in
- `mockGoogleAuth()` - Placeholder for Google OAuth
- `mockAppleAuth()` - Placeholder for Apple OAuth
- `validatePassword(password)` - Real-time password validation

### Data Storage:
- User data: `localStorage.getItem('mockUser')`
- Onboarding data: `localStorage.getItem('onboardingData')` (firstName, surname, country, state, city, alias names)
- Profile photo: `localStorage.getItem('profilePhoto')`

## 🔌 Backend Integration Ready

The code is structured for easy backend integration:

### 1. Replace mock functions in `/app/frontend/src/utils/mockAuth.js`:
```javascript
// Replace mockLogin with actual API call
export const mockLogin = async (username, password, rememberPassword) => {
  const response = await axios.post(`${BACKEND_URL}/api/auth/login`, {
    username,
    password,
    rememberPassword
  });
  return response.data;
};
```

### 2. Add API endpoints for:
- `POST /api/auth/login` - Login with username/password
- `POST /api/auth/signin` - Sign in with email/password
- `POST /api/auth/google` - Google OAuth
- `POST /api/auth/apple` - Apple OAuth
- `POST /api/auth/verify-otp` - Verify OTP code
- `POST /api/auth/resend-otp` - Resend OTP
- `POST /api/onboarding/name` - Save name data
- `POST /api/onboarding/location` - Save location data
- `POST /api/onboarding/username` - Save username/alias
- `POST /api/user/profile-photo` - Upload profile photo
- `GET /api/user/me` - Get current user data

### 3. Replace localStorage with proper JWT tokens:
```javascript
// Store JWT token
localStorage.setItem('authToken', response.data.token);

// Add to axios headers
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
```

## 🧪 Testing the Application

### Manual Testing Flow:
1. Visit `/login` - Try submitting empty form (validation appears)
2. Fill username & password, check "remember password"
3. Click Login → Redirects to `/profile-photo`
4. Upload a photo OR skip
5. Redirects to `/dashboard` showing user info
6. Click Logout → Back to `/login`

### Test Sign In Flow:
1. Visit `/signin`
2. Type in email and password
3. Watch real-time validation indicators
4. Submit form → Profile Photo → Dashboard

## 🎯 Form Validation

### Login Page:
- ✅ Empty field validation
- ✅ Real-time error clearing

### Sign In Page:
- ✅ Email format validation
- ✅ Real-time password requirements checking:
  - Uppercase letter
  - Number
  - Special character
- ✅ Visual indicators (colored dots)

## 🚀 Running the Application

The application is already running:
- **Frontend**: http://localhost:3000
- **Routes**:
  - `/` → Redirects to `/login`
  - `/login` → Login page
  - `/signin` → Sign in page
  - `/profile-photo` → Profile upload
  - `/dashboard` → Dashboard (protected)

## 📝 Next Steps for Backend Integration

1. **Set up authentication endpoints** in your existing backend
2. **Replace mock functions** in `mockAuth.js` with real API calls
3. **Implement JWT token management** (store, refresh, validate)
4. **Add profile photo upload** to cloud storage (S3/Cloudinary)
5. **Protect routes** with authentication middleware
6. **Add session management** for "remember password" feature

## 🎨 Design Notes

- Follows exact design specifications from Figma
- Uses provided color codes (#FA6E80)
- Pixel-perfect button dimensions
- Beautiful gradient backgrounds
- Smooth animations and micro-interactions
- Responsive design for mobile/tablet/desktop
- Clean, modern UI with proper spacing

## 🔐 Security Considerations for Backend

When implementing real authentication:
1. Hash passwords with bcrypt
2. Use JWT with short expiration times
3. Implement refresh token mechanism
4. Add CSRF protection
5. Rate limiting on auth endpoints
6. Secure cookie settings for tokens
7. Validate and sanitize all inputs

---

**Built with**: React 19, Tailwind CSS, Shadcn UI Components, React Router v7
