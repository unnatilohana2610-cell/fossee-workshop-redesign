// BookWorkshop.js - Workshop booking form with validation
// Features: Real-time validation, error clearing on input, success screen
// Form sections: Personal Details and Workshop Preferences
// Accessible: ARIA labels, error announcements, semantic HTML

import React, { useState } from 'react';
import './BookWorkshop.css';

// Available workshops for dropdown selection
const workshopOptions = [
  'Python for Beginners',
  'Scilab Fundamentals',
  'OpenFOAM Basics',
  'Advanced Python',
  'DWSIM Process Simulation',
  'PHP & MySQL'
];

function BookWorkshop() {
  // Stores all form field values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    city: '',
    workshop: '',
    experience: '',
    message: ''
  });

  // Controls success screen visibility after form submission
  const [submitted, setSubmitted] = useState(false);

  // Stores validation error messages per field
  const [errors, setErrors] = useState({});

  // Validates all required fields before submission
  // Returns object with field names as keys and error messages as values
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Enter a valid 10-digit number';
    if (!formData.college.trim()) newErrors.college = 'College name is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.workshop) newErrors.workshop = 'Please select a workshop';
    if (!formData.experience) newErrors.experience = 'Please select your experience level';
    return newErrors;
  };

  // Updates form state on input change
  // Also clears error for that field as user starts typing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts correcting it
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
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
    // Show personalized success screen
    setSubmitted(true);
  };

  // Success screen shown after successful form submission
  if (submitted) {
    return (
      <main className="book-main">
        <div className="container">
          {/* Success message with user's name and workshop for personalization */}
          <div className="success-box" role="alert" aria-live="polite">
            <div className="success-icon">🎉</div>
            <h2>Booking Request Sent!</h2>
            <p>
              Thank you <strong>{formData.name}</strong>! Your request for
              <strong> {formData.workshop}</strong> has been received.
              You will get a confirmation on <strong>{formData.email}</strong> shortly.
            </p>
            {/* Reset form to allow another booking */}
            <button
              className="btn-primary"
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '', email: '', phone: '', college: '',
                  city: '', workshop: '', experience: '', message: ''
                });
              }}
            >
              Book Another Workshop
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="book-main" id="main-content">

      {/* Page header */}
      <section className="book-hero" aria-label="Booking header">
        <div className="container">
          <h1 className="book-title">Book a Workshop</h1>
          <p className="book-subtitle">
            Fill in your details below and we'll confirm your spot.
          </p>
        </div>
      </section>

      <section className="book-body">
        <div className="container">
          {/* Main booking form - noValidate disables browser default validation */}
          <form
            className="book-form"
            onSubmit={handleSubmit}
            noValidate
            aria-label="Workshop booking form"
          >
            {/* Section label for Personal Details */}
            <div className="form-section-label">Personal Details</div>

            {/* Two column layout on desktop, single column on mobile */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name <span className="required">*</span></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Unnati Sharma"
                  className={errors.name ? 'input-error' : ''}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {/* Error message with role alert for screen readers */}
                {errors.name && <span className="error-msg" id="name-error" role="alert">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address <span className="required">*</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. unnati@college.edu"
                  className={errors.email ? 'input-error' : ''}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && <span className="error-msg" id="email-error" role="alert">{errors.email}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number <span className="required">*</span></label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  className={errors.phone ? 'input-error' : ''}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
                {errors.phone && <span className="error-msg" id="phone-error" role="alert">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="city">City <span className="required">*</span></label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. Mumbai"
                  className={errors.city ? 'input-error' : ''}
                  aria-describedby={errors.city ? 'city-error' : undefined}
                />
                {errors.city && <span className="error-msg" id="city-error" role="alert">{errors.city}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="college">College / Institution <span className="required">*</span></label>
              <input
                type="text"
                id="college"
                name="college"
                value={formData.college}
                onChange={handleChange}
                placeholder="e.g. Government Engineering College"
                className={errors.college ? 'input-error' : ''}
                aria-describedby={errors.college ? 'college-error' : undefined}
              />
              {errors.college && <span className="error-msg" id="college-error" role="alert">{errors.college}</span>}
            </div>

            {/* Section label for Workshop Preferences */}
            <div className="form-section-label" style={{ marginTop: '28px' }}>Workshop Preferences</div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="workshop">Select Workshop <span className="required">*</span></label>
                {/* Dropdown populated from workshopOptions array */}
                <select
                  id="workshop"
                  name="workshop"
                  value={formData.workshop}
                  onChange={handleChange}
                  className={errors.workshop ? 'input-error' : ''}
                  aria-describedby={errors.workshop ? 'workshop-error' : undefined}
                >
                  <option value="">-- Choose a workshop --</option>
                  {workshopOptions.map((w, i) => (
                    <option key={i} value={w}>{w}</option>
                  ))}
                </select>
                {errors.workshop && <span className="error-msg" id="workshop-error" role="alert">{errors.workshop}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="experience">Experience Level <span className="required">*</span></label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className={errors.experience ? 'input-error' : ''}
                  aria-describedby={errors.experience ? 'experience-error' : undefined}
                >
                  <option value="">-- Select level --</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                {errors.experience && <span className="error-msg" id="experience-error" role="alert">{errors.experience}</span>}
              </div>
            </div>

            {/* Optional message field - no validation required */}
            <div className="form-group">
              <label htmlFor="message">Additional Message (Optional)</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Any specific questions or requirements..."
                rows={4}
              />
            </div>

            {/* Submit button - triggers validation on click */}
            <button type="submit" className="btn-primary submit-btn">
              Submit Booking Request
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default BookWorkshop;