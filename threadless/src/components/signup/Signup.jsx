import React from "react";
import "./Signup.css";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";

function SignupModal() {
  return (
    <div className="overlay">
      <div className="modal">

        {/* Header */}
        <div className="header">
          <h2>CREATE YOUR ACCOUNT</h2>
          <p>
            or <span className="link">Log in.</span>
          </p>
          <span className="close">×</span>
        </div>

        {/* Form */}
        <div className="body">

          <label>Email</label>
          <input type="email" placeholder="Email" />

          <label>Username</label>
          <input type="text" placeholder="Username" />

          <label>Password</label>
          <input type="password" placeholder="Password" />

          {/* Password Rules */}
          <div className="rules">
            <p>Passwords should be at least 12 characters</p>
            <p>Include lower and uppercase</p>
            <p>Include at least one number</p>
            <p>Include at least one of the following special characters !@#$%</p>
          </div>

          {/* Checkbox */}
          <div className="checkbox">
            <input type="checkbox" />
            <span>
              Keep me up to date on exclusive offers. You can unsubscribe at any time.
              Further details of how we handle your personal information can be found
              in our privacy policy.
            </span>
          </div>

          {/* Main Button */}
          <button className="join-btn">JOIN THREADLESS!</button>

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

          {/* Footer */}
          <p className="footer-text">
            This site is protected by reCAPTCHA and the Google <a href="">Privacy Policy</a> and <a href="">Terms of Service</a> apply.
          </p>

        </div>
      </div>
    </div>
  );
}

export default SignupModal;