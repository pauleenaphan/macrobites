import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CREATE_USER } from '../services/UserApi';
import { useMutation } from '@apollo/client';

// import { CreateUserInput } from '../types/user';

export const SignUpForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [createUser] = useMutation(CREATE_USER);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        console.log(formData.name, formData.email, formData.password)

        try {
            const { data } = await createUser({
                variables: {
                    input: {
                        name: formData.name,
                        email: formData.email,
                        password: formData.password,
                        role: "user", 
                    },
                },
            });

            console.log("User created successfully:", data.createUser);
            localStorage.setItem("macroBitesIsLogged", "true");
            localStorage.setItem("macroBitesUserId", data.createUser._id);
            navigate("/Home");
        } catch (error) {
            console.error("Error creating user:", error);
        }

    };

    return (
        <form className="signupForm" onSubmit={handleSubmit}>
            <label>Name:</label>
            <input 
                type="text" 
                name="name" 
                value={formData.name}
                onChange={handleChange} 
                required 
            />

            <label>Email:</label>
            <input 
                type="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange} 
                required 
            />

            <label>Password:</label>
            <input 
                type="password" 
                name="password" 
                value={formData.password}
                onChange={handleChange} 
                required 
            />

            <label>Confirm Password:</label>
            <input 
                type="password" 
                name="confirmPassword" 
                value={formData.confirmPassword}
                onChange={handleChange} 
                required 
            />

            <button type="submit">Sign Up</button>
        </form>
    );
};

