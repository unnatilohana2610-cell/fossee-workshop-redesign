// Login.js - Combined Login and Register page
// Features: Role selection (Coordinator/Instructor), form toggle,
// real-time validation, personalized success screen
// Accessible: ARIA labels, error announcements, semantic HTML

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  // Controls whether form is in login or register mode
  const [isLogin, setIsLogin] = useState(true);

  // Stores all form field values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'coordinator'
  });

  // Stores validation error messages per field
  const [errors, setErrors] = useState({});

  // Controls success screen visibility after submission
  const [submitted, setSubmitted] = useState(false);

  // Validates form fields based on login or register mode
  // Returns object with field names as keys and error messages as values
  const validate = () => {
    const newErrors = {};
    // Name only required for registration
    if (!isLogin && !formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Minimum 6 characters';
    // Confirm password only required for registration
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  // Updates form state on input change
  // Also clears error for that specific field as user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts correcting it
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // Handles form submission
  // Shows errors if validation fails, shows success screen if valid
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
  };

  // Switches between login and register mode
  // Resets all form data and errors on switch
  const switchMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({
      name: '', email: '', password: '',
      confirmPassword: '', role: 'coordinator'
    });
    setSubmitted(false);
  };

  // Success screen shown after successful login or registration
  if (submitted) {
    return (
      <main className="login-main">
        <div className="container">
          <div className="login-success" role="alert">
            <div className="success-icon">✅</div>
            <h2>{isLogin ? 'Logged In Successfully!' : 'Account Created!'}</h2>
            {/* Personalized welcome message using user's name */}
            <p>Welcome to FOSSEE Workshop Portal{formData.name ? `, ${formData.name}` : ''}.</p>
            <button className="btn-primary" onClick={() => setSubmitted(false)}>
              Go Back
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="login-main" id="main-content">
      <div className="container">
        <div className="login-card">

          {/* Page header - changes based on login or register mode */}
          <div className="login-header">
            <h1 className="login-title">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="login-subtitle">
              {isLogin
                ? 'Login to manage your workshop bookings.'
                : 'Register to start booking FOSSEE workshops.'}
            </p>
          </div>

          {/* Role selector tabs - Coordinator or Instructor */}
          {/* Matches original FOSSEE portal user types */}
          <div className="role-tabs" role="tablist">
            <button
              className={`role-tab ${formData.role === 'coordinator' ? 'active' : ''}`}
              onClick={() => setFormData(prev => ({ ...prev, role: 'coordinator' }))}
              role="tab"
              aria-selected={formData.role === 'coordinator'}
            >
              👨‍💼 Coordinator
            </button>
            <button
              className={`role-tab ${formData.role === 'instructor' ? 'active' : ''}`}
              onClick={() => setFormData(prev => ({ ...prev, role: 'instructor' }))}
              role="tab"
              aria-selected={formData.role === 'instructor'}
            >
              👨‍🏫 Instructor
            </button>
          </div>

          {/* Login/Register form - noValidate disables browser default validation */}
          <form
            className="login-form"
            onSubmit={handleSubmit}
            noValidate
            aria-label={isLogin ? 'Login form' : 'Registration form'}
          >
            {/* Name field only shown in register mode */}
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">Full Name <span className="required">*</span></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className={errors.name ? 'input-error' : ''}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && <span className="error-msg" id="name-error" role="alert">{errors.name}</span>}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address <span className="required">*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={errors.email ? 'input-error' : ''}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && <span className="error-msg" id="email-error" role="alert">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password <span className="required">*</span></label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
                className={errors.password ? 'input-error' : ''}
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
              {errors.password && <span className="error-msg" id="password-error" role="alert">{errors.password}</span>}
            </div>

            {/* Confirm password field only shown in register mode */}
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password <span className="required">*</span></label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className={errors.confirmPassword ? 'input-error' : ''}
                  aria-describedby={errors.confirmPassword ? 'confirm-error' : undefined}
                />
                {errors.confirmPassword && <span className="error-msg" id="confirm-error" role="alert">{errors.confirmPassword}</span>}
              </div>
            )}

            {/* Forgot password link only shown in login mode */}
            {isLogin && (
              <div className="forgot-wrap">
                <Link to="#" className="forgot-link">Forgot password?</Link>
              </div>
            )}

            <button type="submit" className="btn-primary login-btn">
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>

          {/* Toggle between login and register mode */}
          <div className="login-switch">
            <p>
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button className="switch-btn" onClick={switchMode}>
                {isLogin ? ' Register here' : ' Login here'}
              </button>
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}

export default Login;