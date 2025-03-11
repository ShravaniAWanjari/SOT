import React, { useState } from 'react';
import './index.css';
import apiConfig from "./config/apiconfig";

const SignUp = () => {
    const [activeTab, setActiveTab] = useState('login');
    
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    
    const [registerData, setRegisterData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        phone_number: '',
        user_type: 'STUDENT' // Default to STUDENT
    });
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    
    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };
    
    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({
            ...registerData,
            [name]: value
        });
    };
    
    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(null);
        
        try {
            console.log('Sending login request with:', loginData);
            
            const response = await fetch(apiConfig.getUrl('api/auth/login/'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(loginData)
            });
            
            const responseText = await response.text();
            console.log('Raw response:', responseText);
            
            let data;
            try {
                data = JSON.parse(responseText);
            } catch (e) {
                console.error('Failed to parse response as JSON:', e);
                throw new Error('Received invalid response from server');
            }
            
            if (!response.ok) {
                const errorMessage = data.detail || 
                                    data.non_field_errors || 
                                    (data.email && data.email[0]) || 
                                    (data.password && data.password[0]) || 
                                    'Login failed';
                                    
                throw new Error(typeof errorMessage === 'string' ? 
                    errorMessage : JSON.stringify(errorMessage));
            }
            
            console.log('Login successful, received:', data);
            
            if (data.access) {
                // Store JWT tokens
                localStorage.setItem('access_token', data.access);
                
                if (data.refresh) {
                    localStorage.setItem('refresh_token', data.refresh);
                }
                
                if (data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                }
                
                console.log('JWT authentication data saved');
                setSuccess('Login successful!');
                
                // redirect the user here or update app state
                // window.location.href = '/dashboard';
            } else {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    if (data.user) {
                        localStorage.setItem('user', JSON.stringify(data.user));
                    }
                    console.log('Authentication data saved (legacy format)');
                    setSuccess('Login successful!');
                } else {
                    throw new Error('No authentication token received from server');
                }
            }
        } catch (err) {
            console.error('Login error:', err);
            
            if (err.message === 'Failed to fetch') {
                setError('Cannot connect to the server. Please check your internet connection or if the server is running.');
            } else {
                setError(err.message || 'Something went wrong. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };
    
    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(null);
        
        try {
            console.log('Sending registration request with:', registerData);
            
            const response = await fetch(apiConfig.getUrl('api/auth/register/'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(registerData)
            });
            
            const responseText = await response.text();
            console.log('Raw response:', responseText);
            
            let data;
            try {
                data = JSON.parse(responseText);
            } catch (e) {
                console.error('Failed to parse response as JSON:', e);
                throw new Error('Received invalid response from server');
            }
            
            if (!response.ok) {
                let errorMessage = 'Registration failed';
                
                if (data.email) {
                    errorMessage = `Email: ${data.email[0]}`;
                } else if (data.username) {
                    errorMessage = `Username: ${data.username[0]}`;
                } else if (data.password) {
                    errorMessage = `Password: ${data.password[0]}`;
                } else if (data.phone_number) {
                    errorMessage = `Phone Number: ${data.phone_number[0]}`;
                } else if (data.user_type) {
                    errorMessage = `User Type: ${data.user_type[0]}`;
                } else if (data.non_field_errors) {
                    errorMessage = data.non_field_errors[0];
                } else if (data.detail) {
                    errorMessage = data.detail;
                }
                
                throw new Error(errorMessage);
            }
            
            console.log('Registration successful:', data);
            setSuccess('Registration successful! You can now log in.');
            
            setRegisterData({
                name: '',
                username: '',
                email: '',
                password: '',
                phone_number: '',
                user_type: 'STUDENT'
            });
            
            setActiveTab('login');
            
        } catch (err) {
            console.error('Registration error:', err);
            
            if (err.message === 'Failed to fetch') {
                setError('Cannot connect to the server. Please check your internet connection.');
            } else {
                setError(err.message || 'Registration failed. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="auth-container">
            <div className="tabs">
                <button 
                    className={activeTab === 'login' ? 'active' : ''} 
                    onClick={() => setActiveTab('login')}
                >
                    Login
                </button>
                <button 
                    className={activeTab === 'register' ? 'active' : ''} 
                    onClick={() => setActiveTab('register')}
                >
                    Register
                </button>
            </div>
            
            {/* Status messages */}
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            
            {activeTab === 'login' ? (
                <form className="form-container" onSubmit={handleLogin}>
                    <h2>Login</h2>
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Email" 
                        value={loginData.email}
                        onChange={handleLoginChange}
                        required
                    />
                    <input 
                        type="password" 
                        name="password"
                        placeholder="Password" 
                        value={loginData.password}
                        onChange={handleLoginChange}
                        required
                    />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
            ) : (
                <form className="form-container" onSubmit={handleRegister}>
                    <h2>Register</h2>
                    <input 
                        type="text" 
                        name="name"
                        placeholder="Full Name" 
                        value={registerData.name}
                        onChange={handleRegisterChange}
                        required
                    />
                    
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Email" 
                        value={registerData.email}
                        onChange={handleRegisterChange}
                        required
                    />
                    <input 
                        type="password" 
                        name="password"
                        placeholder="Password" 
                        value={registerData.password}
                        onChange={handleRegisterChange}
                        required
                    />
                    <input 
                        type="tel" 
                        name="phone_number"
                        placeholder="Phone Number" 
                        value={registerData.phone_number}
                        onChange={handleRegisterChange}
                        required
                    />
                    <select
                        name="user_type"
                        value={registerData.user_type}
                        onChange={handleRegisterChange}
                        required
                        className="form-select"
                    >
                        <option value="STUDENT">Student</option>
                        <option value="FACULTY">Faculty</option>
                    </select>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default SignUp;