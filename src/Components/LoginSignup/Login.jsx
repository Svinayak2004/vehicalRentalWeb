import React, { useState } from 'react';
import './Login.css';
import remove_icon from '../Assets/delete.png';

const Login = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const endpoint =
      currentState === "Sign Up"
        ? "http://localhost:5000/api/auth/signup"
        : "http://localhost:5000/api/auth/login";

    const payload =
      currentState === "Sign Up"
        ? { name, email, password, phone }
        : { emailOrPhone: email, password };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName", data.user?.name || name);

        setSuccessMessage(`${currentState} successful!`);

        setTimeout(() => {
          setSuccessMessage("");
          setShowLogin(false);
          window.location.reload();
        }, 2000);
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className='Login-pop-up'>
      {successMessage && <div className='success-popup'><p>{successMessage}</p></div>}
      <form className='container' onSubmit={handleSubmit}>
        <div className="title">
          <h2>{currentState}</h2>
          <button type="button" onClick={() => setShowLogin(false)} style={{ background: 'none' }}>
            <img className='remove' src={remove_icon} alt="Close" />
          </button>
        </div>
        {error && <p className='error-message'>{error}</p>}
        <div className="inputs">
          {currentState === "Sign Up" && (
            <input type="text" placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} required />
          )}
          <input type="email" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          {currentState === "Sign Up" && (
            <input type="text" placeholder='Enter Mobile Number' value={phone} onChange={(e) => setPhone(e.target.value)} required />
          )}
        </div>
        <button type="submit">{currentState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className='condition'>
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currentState === "Login" ? (
          <p>Create a new account? <span onClick={() => setCurrentState("Sign Up")}>Click here.</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login here.</span></p>
        )}
      </form>
    </div>
  );
};

export default Login;
