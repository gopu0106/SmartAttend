import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { User, Mail, Lock, UserCircle, CheckCircle } from 'lucide-react';
import AuthShell from '../components/layout/AuthShell';
import GlowButton from '../components/ui/GlowButton';
import ErrorMessage from '../components/ui/ErrorMessage';
import { ROLES } from '../constants/roles';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        full_name: '',
        password: '',
        confirmPassword: '',
        role: ROLES.STUDENT
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const userTypes = [
        { value: ROLES.STUDENT, label: 'Student', icon: '🎓' },
        { value: ROLES.FACULTY, label: 'Faculty', icon: '👨‍🏫' },
        { value: ROLES.ADMIN, label: 'Admin', icon: '👤' },
        { value: ROLES.MESS_STAFF, label: 'Mess Staff', icon: '🍽️' }
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleRoleSelect = (role) => {
        setFormData({ ...formData, role });
        setError('');
    };

    const validateForm = () => {
        if (!formData.username || !formData.email || !formData.full_name || !formData.password || !formData.confirmPassword) {
            setError('All fields are required');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            return false;
        }

        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        if (!usernameRegex.test(formData.username)) {
            setError('Username must be 3-20 characters (letters, numbers, underscore only)');
            return false;
        }

        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long');
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError('');

        try {
            const { confirmPassword, ...registrationData } = formData;
            await api.post('/auth/register', registrationData);

            setSuccess(true);
            setTimeout(() => {
                navigate('/login', {
                    state: { message: 'Registration successful! Please login with your credentials.' }
                });
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="page-bg min-h-screen flex items-center justify-center p-4">
                <div className="glass-card p-8 max-w-md w-full text-center fade-in-up">
                    <div className="w-20 h-20 bg-gradient-button rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow-primary">
                        <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-text-light mb-2">Registration Successful!</h2>
                    <p className="text-text-muted-dark">Redirecting to login page...</p>
                </div>
            </div>
        );
    }

    return (
        <AuthShell
            title="Create Account"
            subtitle="Join SmartAttend Mess Portal today"
        >
            {/* User Type Selector - 2x2 Grid */}
            <div className="mb-8">
                <label className="block text-sm font-semibold text-text-light mb-4">
                    I am a:
                </label>
                <div className="grid grid-cols-2 gap-3">
                    {userTypes.map((type) => (
                        <button
                            key={type.value}
                            type="button"
                            onClick={() => handleRoleSelect(type.value)}
                            className={`
                                p-4 rounded-card-md border-2 transition-smooth hover-lift
                                ${formData.role === type.value
                                    ? 'border-primary-violet bg-primary-violet/10 shadow-glow-primary'
                                    : 'border-glass-border glass-card hover:border-glass-border-hover'
                                }
                            `}
                        >
                            <div className="text-3xl mb-2">{type.icon}</div>
                            <div
                                className={`text-sm font-semibold ${formData.role === type.value ? 'text-primary-violet' : 'text-text-light'
                                    }`}
                            >
                                {type.label}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <ErrorMessage message={error} className="mb-6" />

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Username */}
                <div>
                    <label className="block text-sm font-medium text-text-light mb-2">
                        Username
                    </label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted-dark" />
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter username"
                            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-glass-border rounded-lg text-text-light placeholder-text-muted-dark focus:border-primary-violet focus:shadow-glow-soft focus:outline-none transition-smooth"
                            required
                        />
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-text-light mb-2">
                        Email
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted-dark" />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-glass-border rounded-lg text-text-light placeholder-text-muted-dark focus:border-primary-violet focus:shadow-glow-soft focus:outline-none transition-smooth"
                            required
                        />
                    </div>
                </div>

                {/* Full Name */}
                <div>
                    <label className="block text-sm font-medium text-text-light mb-2">
                        Full Name
                    </label>
                    <div className="relative">
                        <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted-dark" />
                        <input
                            type="text"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            placeholder="Enter full name"
                            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-glass-border rounded-lg text-text-light placeholder-text-muted-dark focus:border-primary-violet focus:shadow-glow-soft focus:outline-none transition-smooth"
                            required
                        />
                    </div>
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-medium text-text-light mb-2">
                        Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted-dark" />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password (min 8 characters)"
                            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-glass-border rounded-lg text-text-light placeholder-text-muted-dark focus:border-primary-violet focus:shadow-glow-soft focus:outline-none transition-smooth"
                            required
                        />
                    </div>
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="block text-sm font-medium text-text-light mb-2">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted-dark" />
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm password"
                            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-glass-border rounded-lg text-text-light placeholder-text-muted-dark focus:border-primary-violet focus:shadow-glow-soft focus:outline-none transition-smooth"
                            required
                        />
                    </div>
                </div>

                <GlowButton
                    type="submit"
                    disabled={loading}
                    loading={loading}
                    className="w-full mt-6"
                >
                    Sign Up
                </GlowButton>
            </form>

            <div className="mt-6 text-center text-sm text-text-muted-dark">
                Already have an account?{' '}
                <button
                    onClick={() => navigate('/login')}
                    className="text-primary-violet hover:text-secondary-cyan font-semibold transition-smooth"
                >
                    Login here
                </button>
            </div>
        </AuthShell>
    );
};

export default Signup;
