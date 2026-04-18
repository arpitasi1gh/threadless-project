import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import "./Signup.css";
import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { findUser, saveUser, setCurrentUser, validatePassword, validateUsername } from "../../utils/auth";
import { signInWithGoogle } from "../../utils/firebase";

function SignupModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [formError, setFormError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const backgroundLocation = useMemo(() => {
    const stateBg = location.state?.backgroundLocation;
    if (stateBg?.pathname) return stateBg;
    try {
      const raw = window.sessionStorage.getItem("threadless:lastNonAuthRoute");
      const parsed = raw ? JSON.parse(raw) : null;
      if (parsed?.pathname) return parsed;
    } catch {}
    return { pathname: "/", search: "", hash: "" };
  }, [location.state]);

  const passwordStatus = useMemo(() => validatePassword(password), [password]);

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

  const onSignup = (event) => {
    event.preventDefault();
    setAttemptedSubmit(true);

    const trimmedUsername = String(username || "").trim();
    setFormError("");
    setStatusMessage("");

    if (!String(email || "").trim()) {
      setFormError("Please enter a valid email address.");
      return;
    }

    const usernameValidation = validateUsername(trimmedUsername);
    if (!usernameValidation.ok) {
      setFormError(usernameValidation.message);
      return;
    }

    const existing = findUser(trimmedUsername);
    if (existing) {
      setFormError("This username already exists. Please log in instead.");
      return;
    }

    if (!passwordStatus.ok) {
      setFormError("Password does not match the required criteria.");
      return;
    }

    if (!accepted) {
      setFormError("Please accept the Terms and Conditions.");
      return;
    }

    saveUser({ email, username: trimmedUsername, password });
    setCurrentUser(trimmedUsername);
    close();
  };

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

  const showPasswordRules = attemptedSubmit || (password.length > 0 && !passwordStatus.ok);

  const content = (
    <div className="overlay" role="presentation" onClick={close}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="header">
          <h2>CREATE YOUR ACCOUNT</h2>
          <p>
            or{" "}
            <span
              className="link"
              role="button"
              tabIndex={0}
              onClick={() => navigate("/login", { state: { backgroundLocation } })}
            >
              Log in.
            </span>
          </p>
          <span className="close" role="button" tabIndex={0} onClick={close} aria-label="Close">
            ×
          </span>
        </div>

        {/* Form */}
        <div className="body">

          <form onSubmit={onSignup}>
            <label htmlFor="signup-email">Email</label>
            <input
              id="signup-email"
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />

            <label htmlFor="signup-username">Username</label>
            <input
              id="signup-username"
              name="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />

            <label htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />

            {formError ? <p className="form-error">{formError}</p> : null}
            {statusMessage ? <p className="status-message">{statusMessage}</p> : null}

            {/* Password Rules */}
            {showPasswordRules ? (
              <div className={`rules ${passwordStatus.ok ? "" : "is-error"}`}>
                <p>Passwords should be at least 12 characters</p>
                <p>Include lower and uppercase and at least one number</p>
                <p>Include at least one of special characters from !@#$%</p>
              </div>
            ) : null}

            {/* Checkbox */}
            <div className="checkbox">
              <input
                id="signup-accepted"
                name="accepted"
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
              />
              <label htmlFor="signup-accepted">
                I have read the Privacy Policy and agree to the mentioned Terms and Conditions.
              </label>
            </div>

            {/* Main Button */}
            <button className="join-btn" type="submit">JOIN THREADLESS!</button>
          </form>

          <div className="divider"><span>OR</span></div>

          {/* Social Buttons */}
          <button type="button" className="social-btn" onClick={() => handleSocialSignIn('google')}>
            <FaGoogle /> Sign in with Google
          </button>

          {/* Footer */}
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

export default SignupModal;
