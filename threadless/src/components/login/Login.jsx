import React from "react";
import "./Login.css";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";

function Login() {
  return (
    <div className="modal-overlay">
      <div className="modal">

        {/* Header */}
        <div className="modal-header">
          <h2>LOG IN</h2>
          <p>
            Don't have an account? <span className="link">Sign up now.</span>
          </p>
          <span className="close">×</span>
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
}

export default Login;