import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import InnerPageBanner from '@/components/layout/InnerPageBanner';
import { A } from '@/lib/assets';
import '@/styles/auth.css';

const COUNTRY_CODES = [
  { code: '+91', country: 'IN (+91)' },
  { code: '+971', country: 'AE (+971)' },
  { code: '+1', country: 'US/CA (+1)' },
  { code: '+44', country: 'UK (+44)' },
  { code: '+65', country: 'SG (+65)' },
  { code: '+966', country: 'SA (+966)' },
  { code: '+974', country: 'QA (+974)' },
  { code: '+61', country: 'AU (+61)' },
  { code: '+49', country: 'DE (+49)' },
];

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [terms, setTerms] = useState(false);

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: typeof errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneClean = phone.replace(/\D/g, '');

    if (!name.trim()) {
      errs.name = 'Please enter your full name.';
    } else if (name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    }

    if (!email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!emailRegex.test(email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!phone.trim()) {
      errs.phone = 'Please enter your mobile phone number.';
    } else if (phoneClean.length < 7 || phoneClean.length > 15) {
      errs.phone = 'Please enter a valid phone number (7–15 digits).';
    }

    if (!password) {
      errs.password = 'Please create a password.';
    } else if (password.length < 8) {
      errs.password = 'Password must be at least 8 characters.';
    } else if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
      errs.password = 'Password must include both letters and numbers.';
    }

    if (!confirmPassword) {
      errs.confirmPassword = 'Please confirm your password.';
    } else if (confirmPassword !== password) {
      errs.confirmPassword = 'Passwords do not match.';
    }

    if (!terms) {
      errs.terms = 'You must agree to the Terms & Conditions and Privacy Policy.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <>
      <InnerPageBanner
        eyebrow="Aurelia Membership"
        title="Create Your Account"
        sub="Join Aurelia for exclusive off-plan access, direct developer allocations, and tailored cross-border advisory."
        img="dubai1.jpg"
        crumbs={[['Home', '/'], ['Create Account']]}
      />

      <section className="auth-page">
        <div className="auth-card-wrap">
          <div className="auth-card">
            <div className="auth-header">
              <Link to="/" style={{ display: 'inline-block', marginBottom: '14px' }}>
                <img src={A('logo-new.png')} alt="Aurelia Real Estate Company" style={{ height: '44px', width: 'auto', maxWidth: '200px', objectFit: 'contain' }} />
              </Link>
              <small>Client Registration</small>
              <h1>Join Aurelia</h1>
              <p>Experience institutional real estate advisory tailored for Pune and Dubai.</p>
            </div>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <CheckCircle2 size={48} style={{ color: 'var(--gold)', margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '20px', color: 'var(--bur)', marginBottom: '8px' }}>
                  Account Created Successfully
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--mut)', lineHeight: 1.6, marginBottom: '24px' }}>
                  Welcome to Aurelia, <b>{name}</b>. A verification confirmation has been sent to <b>{email}</b>.
                </p>
                <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
                  <Link to="/login" className="btn gold" style={{ width: '100%' }}>
                    Proceed to Sign In
                  </Link>
                  <Link to="/exclusive-projects" className="btn-o" style={{ width: '100%' }}>
                    Browse Verified Developments
                  </Link>
                </div>
              </div>
            ) : (
              <form className="auth-form" onSubmit={handleSubmit} noValidate>
                {/* Full Name */}
                <div className="auth-field">
                  <label htmlFor="reg-name">Full Name</label>
                  <div className="auth-input-wrap">
                    <User size={18} className="auth-input-icon" />
                    <input
                      id="reg-name"
                      type="text"
                      className={`auth-input ${errors.name ? 'error' : ''}`}
                      placeholder="e.g. Vikram Malhotra"
                      value={name}
                      onChange={e => {
                        setName(e.target.value);
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      autoComplete="name"
                    />
                  </div>
                  {errors.name && (
                    <div className="auth-error-msg">
                      <AlertCircle size={14} /> {errors.name}
                    </div>
                  )}
                </div>

                {/* Email Address */}
                <div className="auth-field">
                  <label htmlFor="reg-email">Email Address</label>
                  <div className="auth-input-wrap">
                    <Mail size={18} className="auth-input-icon" />
                    <input
                      id="reg-email"
                      type="email"
                      className={`auth-input ${errors.email ? 'error' : ''}`}
                      placeholder="name@example.com"
                      value={email}
                      onChange={e => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && (
                    <div className="auth-error-msg">
                      <AlertCircle size={14} /> {errors.email}
                    </div>
                  )}
                </div>

                {/* Mobile Number with Country Code */}
                <div className="auth-field">
                  <label htmlFor="reg-phone">Mobile Number</label>
                  <div className="auth-phone-group">
                    <select
                      className="auth-phone-cc"
                      value={countryCode}
                      onChange={e => setCountryCode(e.target.value)}
                      aria-label="Country Code"
                    >
                      {COUNTRY_CODES.map(c => (
                        <option key={c.code} value={c.code}>
                          {c.country}
                        </option>
                      ))}
                    </select>

                    <div className="auth-input-wrap" style={{ flex: 1 }}>
                      <Phone size={18} className="auth-input-icon" />
                      <input
                        id="reg-phone"
                        type="tel"
                        className={`auth-input ${errors.phone ? 'error' : ''}`}
                        placeholder="98765 43210"
                        value={phone}
                        onChange={e => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors({ ...errors, phone: undefined });
                        }}
                        autoComplete="tel"
                      />
                    </div>
                  </div>
                  {errors.phone && (
                    <div className="auth-error-msg">
                      <AlertCircle size={14} /> {errors.phone}
                    </div>
                  )}
                </div>

                {/* Password */}
                <div className="auth-field">
                  <label htmlFor="reg-password">Password</label>
                  <div className="auth-input-wrap">
                    <Lock size={18} className="auth-input-icon" />
                    <input
                      id="reg-password"
                      type={showPw ? 'text' : 'password'}
                      className={`auth-input ${errors.password ? 'error' : ''}`}
                      placeholder="At least 8 characters (letters & numbers)"
                      value={password}
                      onChange={e => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors({ ...errors, password: undefined });
                      }}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="auth-pw-toggle"
                      onClick={() => setShowPw(!showPw)}
                      aria-label={showPw ? 'Hide password' : 'Show password'}
                    >
                      {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <div className="auth-error-msg">
                      <AlertCircle size={14} /> {errors.password}
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="auth-field">
                  <label htmlFor="reg-confirm-password">Confirm Password</label>
                  <div className="auth-input-wrap">
                    <Lock size={18} className="auth-input-icon" />
                    <input
                      id="reg-confirm-password"
                      type={showConfirmPw ? 'text' : 'password'}
                      className={`auth-input ${errors.confirmPassword ? 'error' : ''}`}
                      placeholder="Re-enter your password"
                      value={confirmPassword}
                      onChange={e => {
                        setConfirmPassword(e.target.value);
                        if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined });
                      }}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="auth-pw-toggle"
                      onClick={() => setShowConfirmPw(!showConfirmPw)}
                      aria-label={showConfirmPw ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPw ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <div className="auth-error-msg">
                      <AlertCircle size={14} /> {errors.confirmPassword}
                    </div>
                  )}
                </div>

                {/* Terms and Conditions Checkbox */}
                <div className="auth-field">
                  <label className="auth-checkbox">
                    <input
                      type="checkbox"
                      checked={terms}
                      onChange={e => {
                        setTerms(e.target.checked);
                        if (errors.terms) setErrors({ ...errors, terms: undefined });
                      }}
                    />
                    <span>
                      I agree to the{' '}
                      <Link to="/privacy-policy" target="_blank" className="auth-link">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy-policy" target="_blank" className="auth-link">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                  {errors.terms && (
                    <div className="auth-error-msg">
                      <AlertCircle size={14} /> {errors.terms}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn gold auth-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>
            )}

            <div className="auth-footer">
              Already have an Aurelia account?
              <Link to="/login">Sign In</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
