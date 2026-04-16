import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import "./Login.css";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const close = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate("/");
  };

  const content = (
    <div className="modal-overlay" role="presentation" onClick={close}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="modal-header">
          <h2>LOG IN</h2>
          <p>
            Don't have an account?{" "}
            <span className="link" role="button" tabIndex={0} onClick={() => navigate("/signup")}>
              Sign up now.
            </span>
          </p>
          <span className="close" role="button" tabIndex={0} onClick={close} aria-label="Close">
            ×
          </span>
        </div>

        {/* Form */}
        <div className="modal-body">

          <label>Username</label>
          <input type="text" placeholder="Username" />

          <label>Password</label>
          <input type="password" placeholder="Password" />

          <button className="login-btn">LOGIN</button>

          <p className="forgot">Forgot your password?</p>

          <div className="divider">- OR -</div>

          {/* Social Buttons */}
          <button className="social-btn">
            <FaGoogle /> Sign in with Google
          </button>

          <button className="social-btn">
            <FaFacebookF /> Sign in with Facebook
          </button>

          <button className="social-btn">
            <FaApple /> Sign in with Apple
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
