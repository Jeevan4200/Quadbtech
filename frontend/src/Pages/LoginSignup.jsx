import React, { useContext, useState } from 'react';
import { ShopContext } from '../Components/Context/ShopContext';// Import your ShopContext
import './CSS/LoginSignup.css';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { setUser } = useContext(ShopContext); // Get setUser from context

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const endpoint = isLogin ? 'http://localhost:4000/login' : 'http://localhost:4000/signup';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          setUser(data.userData); // Set user data in context on login
          localStorage.setItem('token', data.token); // Store token if needed
        }
        alert(data.message || 'Operation successful!');
      } else {
        alert(data.message || 'An error occurred.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during the operation.');
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={handleSubmit}> {/* Wrap inputs in a form */}
          <div className="loginsignup-fields">
            {!isLogin && (
              <input
                type="text"
                placeholder="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin} // Make name required for signup
              />
            )}
            <input
              type='email'
              placeholder='Email Address'
              name="email"
              value={formData.email}
              onChange={handleChange}
              required // Email is required for both login and signup
            />
            <input
              type='password'
              placeholder='Password'
              name="password"
              value={formData.password}
              onChange={handleChange}
              required // Password is required for both login and signup
            />
          </div>
          <button type="submit">Continue</button> {/* Change button type to submit */}
        </form>
        <p className='loginsignup-login'>
          {isLogin ? 'Don’t have an account?' : 'Already have an account?'}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? ' Sign up here' : ' Login here'}
          </span>
        </p>
        <div className="loginsignup-agree">
          <input type='checkbox' required /> {/* Make the checkbox required */}
          <p>By clicking this, I agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
