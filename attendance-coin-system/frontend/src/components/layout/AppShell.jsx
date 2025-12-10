import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const AppShell = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userRole = user?.role || 'guest';

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    // Role-based navigation items
    const navItems = [];
    if (userRole === 'admin') {
        navItems.push(
            { path: '/admin', label: 'Admin Panel' },
            { path: '/faculty', label: 'Faculty' },
            { path: '/mess', label: 'Mess' }
        );
    } else if (userRole === 'faculty') {
        navItems.push({ path: '/faculty', label: 'Attendance' });
    } else if (userRole === 'mess_staff') {
        navItems.push({ path: '/mess', label: 'Mess Terminal' });
    } else {
        navItems.push({ path: '/dashboard', label: 'Dashboard' });
    }

    return (
        <div className="page-bg min-h-screen">
            {/* Dark Navbar with Glassmorphism */}
            <nav className="sticky top-0 z-50 glass-card border-0 border-b border-glass-border backdrop-blur-glass rounded-none shadow-glass">
                <div className="content-container py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo + Welcome */}
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-button flex items-center justify-center shadow-glow-soft">
                                    <span className="text-white font-bold text-lg">A</span>
                                </div>
                                <span className="text-xl font-bold text-text-light">SmartAttend</span>
                            </div>

                            {/* Welcome Badge */}
                            {user?.full_name && (
                                <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-button glass-card border border-glass-border shadow-glow-soft">
                                    <span className="text-sm text-text-muted-dark">Welcome,</span>
                                    <span className="text-sm font-semibold text-text-light">{user.full_name}</span>
                                </div>
                            )}
                        </div>

                        {/* Navigation Links */}
                        <div className="flex items-center gap-4">
                            {navItems.map((item) => (
                                <button
                                    key={item.path}
                                    onClick={() => navigate(item.path)}
                                    className={`
                                        px-4 py-2 rounded-lg font-medium transition-smooth text-sm
                                        ${location.pathname === item.path
                                            ? 'bg-gradient-button text-white shadow-glow-primary'
                                            : 'text-text-light hover:bg-white/5 hover:shadow-glow-soft'
                                        }
                                    `}
                                >
                                    {item.label}
                                </button>
                            ))}

                            {/* Logout Button */}
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 rounded-button bg-white/10 border border-primary-violet text-text-light hover:bg-primary-violet hover:text-white hover:shadow-glow-primary transition-smooth text-sm font-medium"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="content-container py-8 fade-in-up">
                {children}
            </main>
        </div>
    );
};

export default AppShell;
