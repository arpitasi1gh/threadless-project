import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import "./Login.css";
import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { findUser, setCurrentUser, validateUsername } from "../../utils/auth";
import { signInWithGoogle, sendPasswordReset } from "../../utils/firebase";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [formError, setFormError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const backgroundLocation = useMemo(() => {
    const stateBg = location.state?.backgroundLocation;
    if (stateBg?.pathname) return stateBg;
    try {
      const raw = window.sessionStorage.getItem("threadless:lastNonAuthRoute");
      const parsed = raw ? JSON.parse(raw) : null;
      if (parsed?.pathname) return parsed;
    } catch (error) {
      void error;
    }
    return { pathname: "/", search: "", hash: "" };
  }, [location.state]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const close = () => {
    const path = `${backgroundLocation.pathname || "/"}${backgroundLocation.search || ""}${backgroundLocation.hash || ""}`;
    navigate(path, { replace: true });
  };

  const onLogin = (event) => {
    event.preventDefault();
    const trimmedUsername = String(username || "").trim();
    setFormError("");
    setStatusMessage("");

    const usernameValidation = validateUsername(trimmedUsername);
    if (!usernameValidation.ok) {
      setFormError(usernameValidation.message);
      return;
    }

    const user = findUser(trimmedUsername);
    if (!user) {
      setFormError("Username not found. Please sign up or try a different username.");
      return;
    }

    if (String(user.password || "") !== String(password || "")) {
      setFormError("Password is incorrect. Please try again.");
      return;
    }

    setCurrentUser(trimmedUsername);
    close();
  };

  const onForgotPassword = () => {
    setFormError("");
    setStatusMessage("");
    setResetEmail("");
    setForgotPasswordMode(true);
  }

  const onResetPassword = async () => {
    setFormError("");
    setStatusMessage("");

    const normalized = String(resetEmail || "").trim();
    if (!normalized) {
      setFormError("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    try {
      await sendPasswordReset(normalized);
      setStatusMessage("If that email address is registered, a password reset link has been sent.");
      setForgotPasswordMode(false);
      setResetEmail("");
    } catch (error) {
      setFormError(error?.message || "Unable to process password reset at this time.");
    }
  }

  const handleSocialSignIn = async (provider) => {
    setFormError("");
    setStatusMessage("");

    try {
      let result
      if (provider === 'google') {
        result = await signInWithGoogle()
      }

      if (result?.user) {
        setCurrentUser(
          result.user.displayName || result.user.email || result.user.uid,
          result.user.photoURL,
        )
        close()
      }
    } catch (error) {
      // Silently ignore user cancelling the popup
      if (error?.code === 'auth/popup-closed-by-user') {
        return
      }
      setFormError('Unable to sign in. Please try again.')
    }
  }

  const content = (
    <div className="modal-overlay" role="presentation" onClick={close}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="modal-header">
          <h2>LOG IN</h2>
          <p>
            Don't have an account?{" "}
            <span
              className="link"
              role="button"
              tabIndex={0}
              onClick={() => navigate("/signup", { state: { backgroundLocation } })}
            >
              Sign up now.
            </span>
          </p>
          <span className="close" role="button" tabIndex={0} onClick={close} aria-label="Close">
            ×
          </span>
        </div>

        {/* Form */}
        <div className="modal-body">

          <form onSubmit={onLogin}>
            <label htmlFor="login-username">Username</label>
            <input
              id="login-username"
              name="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />

            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            {forgotPasswordMode ? (
              <div className="reset-container">
                <label htmlFor="login-reset-email">Enter email to reset password</label>
                <input
                  id="login-reset-email"
                  name="resetEmail"
                  type="email"
                  placeholder="Email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  autoComplete="email"
                />
                <div className="reset-actions">
                  <button type="button" className="reset-btn" onClick={onResetPassword}>
                    Send reset link
                  </button>
                  <button
                    type="button"
                    className="reset-cancel"
                    onClick={() => {
                      setForgotPasswordMode(false);
                      setResetEmail("");
                      setFormError("");
                      setStatusMessage("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : null}

            {formError ? <p className="form-error">{formError}</p> : null}
            {statusMessage ? <p className="status-message">{statusMessage}</p> : null}

            <button className="login-btn" type="submit">LOGIN</button>
          </form>

          <p className="forgot" role="button" tabIndex={0} onClick={onForgotPassword}>
            Forgot your password?
          </p>

          <div className="divider"><span>OR</span></div>

          {/* Social Buttons */}
          <button type="button" className="social-btn" onClick={() => handleSocialSignIn('google')}>
            <FaGoogle /> Login in with Google
          </button>

          <p className="footer-text">

            This site is protected by reCAPTCHA and the Google <a href="">Privacy Policy</a> and <a href="">Terms of Service</a> apply.
          </p>

        </div>

      </div>
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(content, document.body);
}

export default Login;
