import React, { useState } from 'react';

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here (e.g., send email and password to the server)
        console.log('Email:', email, 'Password:', password);
    };

    return (
        <form className="loginForm" onSubmit={handleSubmit}>
            <label>Email:</label>
            <input 
                type="email" 
                value={email}
                onChange={handleEmailChange} 
                required 
            />

            <label>Password:</label>
            <input 
                type="password" 
                value={password}
                onChange={handlePasswordChange}
                required 
            />

            <button type="submit">Login</button>
        </form>
    );
};

