import React, { useState } from 'react';
import './index.css';

const SignUp = () => {
    const [activeTab, setActiveTab] = useState('login');
    const [showOTPPopup, setShowOTPPopup] = useState(false);
    const [otpValue, setOtpValue] = useState('');
    const [registrationData, setRegistrationData] = useState({
        name: '',
        username: '',
        email: '',
        password: ''
    });

    // Handle registration form changes
    const handleRegistrationChange = (e) => {
        const { name, value } = e.target;
        setRegistrationData({ ...registrationData, [name]: value });
    };

    // Handle sign up button click
    const handleSignUp = (e) => {
        e.preventDefault();
        // Show OTP popup after validating initial form data
        if (registrationData.name && registrationData.username && registrationData.email && registrationData.password) {
            // In a real application, you would send the registration data to the server
            // and the server would send an OTP to the user's email/phone
            // For demo purposes, we just show the OTP popup
            setShowOTPPopup(true);
        } else {
            alert('Please fill in all the required fields');
        }
    };

    // Handle OTP verification
    const handleVerifyOTP = () => {
        // In a real application, you would verify the OTP against what was sent
        // For demo purposes, we just check if it's not empty
        if (otpValue) {
            // Complete the registration process
            alert('Registration successful! You can now login.');
            setShowOTPPopup(false);
            setActiveTab('login');
            // Reset form data
            setRegistrationData({
                name: '',
                username: '',
                email: '',
                password: ''
            });
            setOtpValue('');
        } else {
            alert('Please enter the OTP');
        }
    };

    // OTP Popup Component
    const OTPPopup = () => {
        return (
            <div className="otp-popup-overlay">
                <div className="otp-popup">
                    <h2>Verify your account</h2>
                    <p>Please enter the OTP sent to your email/phone</p>
                    <input 
                        type="text" 
                        placeholder="Enter OTP" 
                        value={otpValue}
                        onChange={(e) => setOtpValue(e.target.value)}
                        maxLength={6}
                    />
                    <div className="otp-buttons">
                        <button onClick={handleVerifyOTP}>Verify</button>
                        <button onClick={() => setShowOTPPopup(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="auth-container">
            <div className="tabs">
                <button className={activeTab === 'login' ? 'active' : ''} onClick={() => setActiveTab('login')}>Login</button>
                <button className={activeTab === 'register' ? 'active' : ''} onClick={() => setActiveTab('register')}>Register</button>
            </div>

            {activeTab === 'login' ? (
                <div className="form-container">
                    <h2>Login</h2>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button>Sign In</button>
                </div>
            ) : (
                <div className="form-container">
                    <h2>Register</h2>
                    <input 
                        type="text" 
                        name="name"
                        placeholder="Name" 
                        value={registrationData.name}
                        onChange={handleRegistrationChange}
                    />
                    <input 
                        type="text" 
                        name="username"
                        placeholder="Username" 
                        value={registrationData.username}
                        onChange={handleRegistrationChange}
                    />
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Email" 
                        value={registrationData.email}
                        onChange={handleRegistrationChange}
                    />
                    <input 
                        type="password" 
                        name="password"
                        placeholder="Password" 
                        value={registrationData.password}
                        onChange={handleRegistrationChange}
                    />
                    <button onClick={handleSignUp}>Sign Up</button>
                </div>
            )}

            {showOTPPopup && <OTPPopup />}
        </div>
    );
};

export default SignUp;