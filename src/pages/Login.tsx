import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle, X, CheckCircle2 } from 'lucide-react';
import InnerPageBanner from '@/components/layout/InnerPageBanner';
import { A } from '@/lib/assets';
import '@/styles/auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Forgot password modal state
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotError, setForgotError] = useState('');

  const validate = () => {
    const errs: { email?: string; password?: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!emailRegex.test(email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!password) {
      errs.password = 'Please enter your password.';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Frontend UI submission handling
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!forgotEmail.trim() || !emailRegex.test(forgotEmail.trim())) {
      setForgotError('Please enter a valid email address.');
      return;
    }
    setForgotError('');
    setForgotSent(true);
  };

  return (
    <>
      <InnerPageBanner
        eyebrow="Aurelia Membership"
        title="Member Sign In"
        sub="Access your portfolio briefings, saved properties, and private advisory requests."
        img="office.jpg"
        crumbs={[['Home', '/'], ['Sign In']]}
      />

      <section className="auth-page">
        <div className="auth-card-wrap">
          <div className="auth-card">
            <div className="auth-header">
              <Link to="/" style={{ display: 'inline-block', marginBottom: '14px' }}>
                <img src={A('logo-new.png')} alt="Aurelia Real Estate Company" style={{ height: '44px', width: 'auto', maxWidth: '200px', objectFit: 'contain' }} />
              </Link>
              <small>Client Portal</small>
              <h1>Welcome Back</h1>
              <p>Sign in to manage your real estate inquiries and saved developments.</p>
            </div>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <CheckCircle2 size={48} style={{ color: 'var(--gold)', margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '20px', color: 'var(--bur)', marginBottom: '8px' }}>
                  Verification in Progress
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--mut)', lineHeight: 1.6, marginBottom: '24px' }}>
                  Signed in as <b>{email}</b>. Live session authorization is active for this device.
                </p>
                <Link to="/exclusive-projects" className="btn gold" style={{ width: '100%' }}>
                  Explore Portfolio
                </Link>
              </div>
            ) : (
              <form className="auth-form" onSubmit={handleSubmit} noValidate>
                {/* Email Field */}
                <div className="auth-field">
                  <label htmlFor="login-email">Email Address</label>
                  <div className="auth-input-wrap">
                    <Mail size={18} className="auth-input-icon" />
                    <input
                      id="login-email"
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

                {/* Password Field */}
                <div className="auth-field">
                  <label htmlFor="login-password">Password</label>
                  <div className="auth-input-wrap">
                    <Lock size={18} className="auth-input-icon" />
                    <input
                      id="login-password"
                      type={showPw ? 'text' : 'password'}
                      className={`auth-input ${errors.password ? 'error' : ''}`}
                      placeholder="Enter your password"
                      value={password}
                      onChange={e => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors({ ...errors, password: undefined });
                      }}
                      autoComplete="current-password"
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

                {/* Remember Me & Forgot Password */}
                <div className="auth-row-between">
                  <label className="auth-checkbox">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={e => setRemember(e.target.checked)}
                    />
                    <span>Remember me</span>
                  </label>

                  <button
                    type="button"
                    className="auth-link"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    onClick={() => {
                      setForgotOpen(true);
                      setForgotSent(false);
                      setForgotError('');
                      setForgotEmail(email);
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn gold auth-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Authenticating...' : 'Sign In'}
                </button>
              </form>
            )}

            <div className="auth-footer">
              Don’t have an Aurelia account?
              <Link to="/create-account">Create an Account</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Forgot Password Modal */}
      {forgotOpen && (
        <div className="auth-modal-overlay" onClick={() => setForgotOpen(false)}>
          <div className="auth-modal" onClick={e => e.stopPropagation()}>
            <button
              className="auth-modal-close"
              onClick={() => setForgotOpen(false)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {forgotSent ? (
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <CheckCircle2 size={40} style={{ color: 'var(--gold)', margin: '0 auto 12px' }} />
                <h3>Password Reset Sent</h3>
                <p>
                  Instructions to reset your password have been dispatched to <b>{forgotEmail}</b>. Please check your inbox and spam folders.
                </p>
                <button
                  type="button"
                  className="btn gold"
                  style={{ width: '100%' }}
                  onClick={() => setForgotOpen(false)}
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <div>
                <h3>Reset Your Password</h3>
                <p>
                  Enter the email address registered with your Aurelia account, and our system will send you a secure link to reset your credentials.
                </p>
                <form onSubmit={handleForgotSubmit}>
                  <div className="auth-field" style={{ marginBottom: '16px' }}>
                    <label htmlFor="forgot-email">Email Address</label>
                    <div className="auth-input-wrap">
                      <Mail size={18} className="auth-input-icon" />
                      <input
                        id="forgot-email"
                        type="email"
                        className={`auth-input ${forgotError ? 'error' : ''}`}
                        placeholder="name@example.com"
                        value={forgotEmail}
                        onChange={e => {
                          setForgotEmail(e.target.value);
                          if (forgotError) setForgotError('');
                        }}
                      />
                    </div>
                    {forgotError && (
                      <div className="auth-error-msg">
                        <AlertCircle size={14} /> {forgotError}
                      </div>
                    )}
                  </div>
                  <button type="submit" className="btn gold" style={{ width: '100%' }}>
                    Send Reset Link
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
