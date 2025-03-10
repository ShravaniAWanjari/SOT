import React, { useState } from 'react';
import './index.css';

const SignUp = () => {
    const [activeTab, setActiveTab] = useState('login');

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
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Username" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button>Sign Up</button>
                </div>
            )}
        </div>
    );
};

export default SignUp;