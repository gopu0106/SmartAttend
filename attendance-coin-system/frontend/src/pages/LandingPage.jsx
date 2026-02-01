import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Users, Coins, Gift, Settings, BarChart3, Utensils } from 'lucide-react';
import Antigravity from '../components/animations/Antigravity';
import GlowButton from '../components/ui/GlowButton';

const LandingPage = () => {
    const navigate = useNavigate();

    const howItWorksSteps = [
        {
            step: 1,
            icon: Users,
            title: 'Faculty Marks Attendance',
            description: 'Faculty easily tracks student attendance through an intuitive portal with bulk actions.',
            color: 'from-primary-violet to-secondary-cyan',
        },
        {
            step: 2,
            icon: Coins,
            title: 'Students Earn Coins',
            description: 'Students automatically receive coins for each day of attendance, with bonus rewards for streaks.',
            color: 'from-secondary-cyan to-primary-violet',
        },
        {
            step: 3,
            icon: Gift,
            title: 'Redeem for Rewards',
            description: 'Convert coins into mess credit, event tickets, or other campus perks instantly.',
            color: 'from-primary-violet to-accent-pink',
        },
        {
            step: 4,
            icon: Settings,
            title: 'Admin Controls',
            description: 'Admins set rules, approve requests, and monitor the entire system through a powerful dashboard.',
            color: 'from-accent-pink to-secondary-cyan',
        },
    ];

    const testimonials = [
        {
            name: 'Dr. Sarah Johnson',
            role: 'Faculty Head, CS Department',
            university: 'MIT',
            quote: 'AttendanceCoin transformed our attendance tracking. Students are now motivated to attend, and the gamification aspect makes it fun!',
            avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=8b5cf6&color=fff',
        },
        {
            name: 'Rahul Kumar',
            role: 'Student, Final Year',
            university: 'IIT Delhi',
            quote: 'I love earning coins for attending classes. The streak system keeps me motivated, and redeeming for mess credit is super convenient.',
            avatar: 'https://ui-avatars.com/api/?name=Rahul+Kumar&background=22d3ee&color=fff',
        },
        {
            name: 'Prof. Michael Chen',
            role: 'Dean of Students',
            university: 'Stanford',
            quote: 'The analytics provide valuable insights into student engagement. Attendance rates increased by 30% after implementing AttendanceCoin.',
            avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=ec4899&color=fff',
        },
    ];

    const roleCTAs = [
        {
            role: 'student',
            title: 'For Students',
            description: 'Earn coins, unlock badges, and redeem rewards',
            primaryCTA: 'Start Earning Coins',
            secondaryCTA: 'View Student Demo',
            icon: Users,
            gradient: 'from-primary-violet to-secondary-cyan',
        },
        {
            role: 'faculty',
            title: 'For Faculty',
            description: 'Mark attendance efficiently with powerful tools',
            primaryCTA: 'Get Started',
            secondaryCTA: 'View Faculty Demo',
            icon: BarChart3,
            gradient: 'from-secondary-cyan to-primary-violet',
        },
        {
            role: 'mess',
            title: 'For Mess Staff',
            description: 'Process payments and manage mess transactions',
            primaryCTA: 'Get Started',
            secondaryCTA: 'View Mess Demo',
            icon: Utensils,
            gradient: 'from-accent-pink to-secondary-cyan',
        },
        {
            role: 'admin',
            title: 'For Administrators',
            description: 'Complete control over your institution\'s system',
            primaryCTA: 'Request Demo',
            secondaryCTA: 'View Admin Demo',
            icon: Settings,
            gradient: 'from-primary-violet to-accent-pink',
        },
    ];

    return (
        <div className="page-bg min-h-screen relative">
            {/* Background Animation - Highly Reactive */}
            <div className="fixed inset-0 z-0 pointer-events-auto opacity-60">
                <Antigravity
                    count={800}
                    magnetRadius={15}
                    ringRadius={12}
                    waveSpeed={2.5}
                    waveAmplitude={2.5}
                    particleSize={1.8}
                    lerpSpeed={0.12}
                    color="#8b5cf6"
                    autoAnimate
                    particleVariance={1.5}
                    rotationSpeed={0.2}
                    depthFactor={2}
                    pulseSpeed={4}
                    particleShape="sphere"
                    fieldStrength={12}
                />
            </div>

            {/* Navbar */}
            <nav className="glass-card border-0 border-b border-glass-border backdrop-blur-glass rounded-none">
                <div className="content-container py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-button flex items-center justify-center shadow-glow-soft">
                                <span className="text-white font-bold text-lg">A</span>
                            </div>
                            <span className="text-xl font-bold text-text-light">SmartAttend</span>
                        </div>

                        {/* Nav Links */}
                        <div className="hidden md:flex items-center gap-6">
                            <a href="#how-it-works" className="text-text-muted-dark hover:text-text-light transition-smooth text-sm">How it works</a>
                            <a href="#testimonials" className="text-text-muted-dark hover:text-text-light transition-smooth text-sm">Testimonials</a>
                            <a href="#for-everyone" className="text-text-muted-dark hover:text-text-light transition-smooth text-sm">Solutions</a>
                        </div>

                        {/* Auth Buttons */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate('/login')}
                                className="px-4 py-2 text-text-light hover:text-white transition-smooth text-sm font-medium"
                            >
                                Log in
                            </button>
                            <GlowButton onClick={() => navigate('/signup')}>
                                Get Started
                            </GlowButton>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="content-container py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column */}
                    <div className="space-y-8 fade-in-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-button glass-card border border-glass-border shadow-glow-soft">
                            <span className="text-xs font-bold text-primary-violet uppercase tracking-wider">
                                FOR COLLEGES & TEAMS
                            </span>
                        </div>

                        <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                            <span className="text-text-light">Turn </span>
                            <span className="gradient-text">Mess Management</span>
                            <span className="text-text-light"> into a </span>
                            <span className="gradient-text">Seamless Experience.</span>
                        </h1>

                        <p className="text-xl text-text-muted-dark leading-relaxed">
                            Upgrade your campus dining with SmartAttend.
                            Digital attendance, mess credits, and real-time analytics in one platform.
                        </p>

                        <div className="flex items-center gap-4 flex-wrap">
                            <GlowButton
                                onClick={() => navigate('/signup')}
                                className="text-lg px-8 py-4"
                            >
                                <span>Start Pilot</span>
                                <ArrowRight className="w-5 h-5" />
                            </GlowButton>

                            <button
                                onClick={() => navigate('/demo/faculty')}
                                className="px-8 py-4 rounded-button text-lg font-semibold text-text-light border-2 border-glass-border hover:border-primary-violet hover:shadow-glow-soft transition-smooth"
                            >
                                View Demo
                            </button>
                        </div>
                    </div>

                    {/* Hero Text Placeholder (OrbitAnimation was here) */}
                    <div className="h-[400px] lg:h-[500px] flex items-center justify-center relative z-10 pointer-events-none">
                        {/* Empty space kept to maintain layout balance, Antigravity will be visible through it */}
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div id="how-it-works" className="content-container py-20">
                <div className="text-center mb-16 fade-in-up">
                    <h2 className="text-4xl md:text-5xl font-bold text-text-light mb-4">
                        How It <span className="gradient-text">Works</span>
                    </h2>
                    <p className="text-xl text-text-muted-dark max-w-2xl mx-auto">
                        A simple 4-step process that transforms mess management
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {howItWorksSteps.map((step, index) => (
                        <div key={index} className="fade-in-up relative" style={{ animationDelay: `${index * 100}ms` }}>
                            <div className="glass-card p-6 hover-lift h-full">
                                {/* Step Number */}
                                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 shadow-glow-primary`}>
                                    <span className="text-white font-bold text-lg">{step.step}</span>
                                </div>

                                {/* Icon */}
                                <div className="mb-4">
                                    <step.icon className="w-10 h-10 text-primary-violet" />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-text-light mb-3">{step.title}</h3>
                                <p className="text-text-muted-dark text-sm leading-relaxed">{step.description}</p>
                            </div>

                            {/* Connector Line */}
                            {index < howItWorksSteps.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary-violet to-secondary-cyan opacity-30"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Testimonials Section */}
            <div id="testimonials" className="content-container py-20">
                <div className="text-center mb-16 fade-in-up">
                    <h2 className="text-4xl md:text-5xl font-bold text-text-light mb-4">
                        Loved by <span className="gradient-text">Educators</span>
                    </h2>
                    <p className="text-xl text-text-muted-dark max-w-2xl mx-auto">
                        See what faculty and students are saying about SmartAttend
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="glass-card p-8 hover-lift fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                            <div className="flex items-center gap-4 mb-6">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="w-16 h-16 rounded-full shadow-glow-soft"
                                />
                                <div>
                                    <div className="font-bold text-text-light">{testimonial.name}</div>
                                    <div className="text-sm text-text-muted-dark">{testimonial.role}</div>
                                    <div className="text-xs text-primary-violet">{testimonial.university}</div>
                                </div>
                            </div>
                            <p className="text-text-muted-dark italic leading-relaxed">"{testimonial.quote.replace('AttendanceCoin', 'SmartAttend')}"</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Role-Specific CTAs */}
            <div id="for-everyone" className="content-container py-20">
                <div className="text-center mb-16 fade-in-up">
                    <h2 className="text-4xl md:text-5xl font-bold text-text-light mb-4">
                        Built for <span className="gradient-text">Everyone</span>
                    </h2>
                    <p className="text-xl text-text-muted-dark max-w-2xl mx-auto">
                        Tailored solutions for students, faculty, and administrators
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {roleCTAs.map((cta, index) => (
                        <div key={index} className="glass-card p-8 hover-lift fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${cta.gradient} flex items-center justify-center mb-6 shadow-glow-primary`}>
                                <cta.icon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-text-light mb-3">{cta.title}</h3>
                            <p className="text-text-muted-dark mb-6">{cta.description}</p>
                            <div className="space-y-3">
                                <GlowButton
                                    onClick={() => navigate('/signup')}
                                    className="w-full"
                                >
                                    {cta.primaryCTA}
                                </GlowButton>
                                <button
                                    onClick={() => navigate(`/demo/${cta.role}`)}
                                    className="w-full px-4 py-3 rounded-lg text-sm font-medium text-primary-violet border border-primary-violet/50 hover:bg-primary-violet/10 hover:shadow-glow-soft transition-smooth"
                                >
                                    {cta.secondaryCTA}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer CTA */}
            <div className="content-container py-20">
                <div className="glass-card p-12 text-center fade-in-up">
                    <h2 className="text-4xl font-bold text-text-light mb-4">
                        Ready to Transform Mess Management?
                    </h2>
                    <p className="text-xl text-text-muted-dark mb-8 max-w-2xl mx-auto">
                        Join 50+ institutions already using SmartAttend to boost efficiency
                    </p>
                    <GlowButton
                        onClick={() => navigate('/signup')}
                        className="text-lg px-10 py-4"
                    >
                        Start Free Pilot <ArrowRight className="w-5 h-5 ml-2" />
                    </GlowButton>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
