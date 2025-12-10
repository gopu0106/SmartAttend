import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Utensils, AlertCircle, CheckCircle, Clock, QrCode, MapPin, TrendingUp, IndianRupee, Grid, List, CreditCard, User } from 'lucide-react';
import GlowButton from '../components/ui/GlowButton';
import { MEAL_INTERVALS } from '../constants/mockData';
import ConfirmationModal from '../components/modals/ConfirmationModal';
import ErrorMessage from '../components/ui/ErrorMessage';
import SuccessMessage from '../components/ui/SuccessMessage';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { formatCurrency, formatRelativeDate } from '../utils/helpers';

const MessTerminal = ({ demoMode = false }) => {
    const navigate = useNavigate();
    const [rollNo, setRollNo] = useState('');
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [customAmount, setCustomAmount] = useState('');
    const [recentTransactions, setRecentTransactions] = useState([
        { id: 1, student: 'John Doe', rollNo: 'CS101', meal: 'Breakfast', amount: 50, time: new Date(Date.now() - 300000) },
        { id: 2, student: 'Jane Smith', rollNo: 'CS102', meal: 'Lunch', amount: 80, time: new Date(Date.now() - 600000) },
    ]);

    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(true);
        setPaymentStatus(null);
        setErrorMessage('');

        setTimeout(() => {
            if (rollNo.trim()) {
                setStudent({
                    name: 'John Doe',
                    rollNo: rollNo,
                    mess_balance: 450.50,
                    image: 'https://ui-avatars.com/api/?name=John+Doe&background=8b5cf6&color=fff',
                    last_meal: 'Breakfast (6 hours ago)',
                });
            } else {
                setStudent(null);
            }
            setLoading(false);
        }, 800);
    };

    const handleMealClick = (meal) => {
        if (!student) return;

        // Validate balance
        if (student.mess_balance < meal.price) {
            setErrorMessage('Insufficient Balance!');
            setPaymentStatus('error');
            return;
        }

        setSelectedMeal(meal);
        setShowConfirmModal(true);
    };

    const confirmPayment = () => {
        setLoading(true);

        setTimeout(() => {
            // Deduct amount
            const newBalance = student.mess_balance - selectedMeal.price;
            setStudent(prev => ({
                ...prev,
                mess_balance: newBalance,
                last_meal: `${selectedMeal.label} (just now)`,
            }));

            // Add to recent transactions
            setRecentTransactions(prev => [
                {
                    id: Date.now(),
                    student: student.name,
                    rollNo: student.rollNo,
                    meal: selectedMeal.label,
                    amount: selectedMeal.price,
                    time: new Date(),
                },
                ...prev.slice(0, 9),
            ]);

            setPaymentStatus('success');
            setShowConfirmModal(false);
            setSelectedMeal(null);
            setLoading(false);

            setTimeout(() => setPaymentStatus(null), 3000);
        }, 1000);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 pt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Terminal (Left - 2 columns) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card p-8 fade-in-up">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-primary-violet/20 rounded-lg border border-primary-violet/30">
                                    <Utensils className="w-6 h-6 text-primary-violet" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-text-light flex items-center gap-2">
                                        Mess Terminal
                                    </h1>
                                    <p className="text-text-muted-dark text-sm flex items-center gap-1 mt-1">
                                        <MapPin className="w-3 h-3" />
                                        Terminal ID: TER-04 • Main Hall
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="px-3 py-2 bg-secondary-cyan/10 border border-secondary-cyan/30 rounded-lg">
                                    <div className="text-xs text-text-muted-dark uppercase mb-1">Served</div>
                                    <div className="text-lg font-bold text-secondary-cyan flex items-center gap-1">
                                        <TrendingUp className="w-4 h-4" />
                                        142
                                    </div>
                                </div>
                                <div className="px-3 py-2 bg-green-500/10 border border-green-500/30 rounded-lg">
                                    <div className="text-xs text-text-muted-dark uppercase mb-1">Revenue</div>
                                    <div className="text-lg font-bold text-green-400 flex items-center gap-1">
                                        <IndianRupee className="w-4 h-4" />
                                        8560
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Search Form with QR Scan */}
                        <form onSubmit={handleSearch} className="mb-8">
                            <div className="flex gap-3">
                                <div className="relative flex-1">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted-dark" />
                                    <input
                                        type="text"
                                        value={rollNo}
                                        onChange={(e) => setRollNo(e.target.value)}
                                        placeholder="CSE2024001"
                                        className="w-full pl-12 pr-4 py-4 bg-white/5 border-2 border-glass-border rounded-lg text-text-light placeholder-text-muted-dark text-lg focus:border-primary-violet focus:shadow-glow-soft focus:outline-none transition-smooth"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => navigate('/qr-scan')}
                                    className="px-6 py-4 bg-primary-violet/20 border-2 border-primary-violet/40 rounded-lg text-primary-violet hover:bg-primary-violet/30 transition-smooth flex items-center gap-2 font-medium"
                                >
                                    <QrCode className="w-5 h-5" />
                                    Scan QR
                                </button>
                                <button
                                    type="submit"
                                    className="px-8 py-4 bg-gradient-button rounded-lg text-white font-semibold hover:scale-105 transition-smooth shadow-glow-soft"
                                >
                                    Search
                                </button>
                            </div>
                        </form>

                        {/* Loading State */}
                        {loading && !student && (
                            <div className="py-12 text-center">
                                <LoadingSpinner size="lg" />
                                <p className="text-text-muted-dark mt-4">Searching student database...</p>
                            </div>
                        )}

                        {/* Student Info and Payment */}
                        {student && (
                            <div className="space-y-6 fade-in-up">
                                {/* Student Profile */}
                                <div className="flex items-center gap-4 p-5 glass-card border border-glass-border rounded-lg hover-lift relative">
                                    <div className="relative">
                                        <img src={student.image} alt={student.name} className="w-16 h-16 rounded-full shadow-glow-soft border-2 border-primary-violet/50" />
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-2 border-bg-deep-navy rounded-full pulse-animation"></div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h2 className="text-xl font-bold text-text-light">{student.name}</h2>
                                            <span className="px-2 py-0.5 bg-green-500/20 border border-green-500/40 text-green-400 text-xs rounded-full">Active</span>
                                        </div>
                                        <p className="text-text-muted-dark">{student.rollNo}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-text-muted-dark uppercase mb-1">Current Balance</p>
                                        <div className="text-2xl font-bold text-green-400">{formatCurrency(student.mess_balance)}</div>
                                    </div>
                                </div>

                                {/* Meal Selection */}
                                <div className="mb-8">
                                    <h2 className="text-xl font-semibold text-text-light mb-4 flex items-center gap-2">
                                        <Utensils className="w-5 h-5 text-secondary-cyan" />
                                        Select Meal Interval
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {MEAL_INTERVALS.map((meal) => (
                                            <button
                                                key={meal.type}
                                                onClick={() => {
                                                    setSelectedMeal(meal);
                                                    // Assuming setStatus is defined elsewhere or needs to be added
                                                    // setStatus('idle');
                                                }}
                                                className={`
                                                    relative overflow-hidden rounded-xl border-2 transition-smooth hover-lift text-left group
                                                    ${selectedMeal?.type === meal.type
                                                        ? 'border-secondary-cyan bg-secondary-cyan/10 shadow-glow-secondary'
                                                        : 'border-glass-border glass-card hover:border-glass-border-hover'
                                                    }
                                                `}
                                            >
                                                <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${meal.color}`}></div>
                                                <div className="p-4 pl-6">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <span className="text-3xl">{meal.icon}</span>
                                                        <div className="text-right">
                                                            <span className="block font-bold text-text-light text-lg">₹{meal.price}</span>
                                                        </div>
                                                    </div>

                                                    <h3 className={`font-bold text-lg mb-1 ${selectedMeal?.type === meal.type ? 'text-secondary-cyan' : 'text-text-light'}`}>
                                                        {meal.label}
                                                    </h3>

                                                    <div className="flex items-center gap-1 text-xs text-text-muted-dark mb-3">
                                                        <Clock className="w-3 h-3" />
                                                        <span>{meal.timeRange}</span>
                                                    </div>

                                                    <div className="text-xs text-text-muted-dark border-t border-glass-border pt-2 mt-2">
                                                        <span className="font-semibold text-primary-violet">Today's Menu:</span>
                                                        <p className="line-clamp-2 mt-1">{meal.menuItems.join(', ')}</p>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Custom Amount */}
                                <div>
                                    <h3 className="text-sm font-semibold text-text-muted-dark uppercase tracking-wider mb-3">Custom Amount</h3>
                                    <div className="flex gap-3">
                                        <div className="relative flex-1">
                                            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted-dark" />
                                            <input
                                                type="number"
                                                value={customAmount}
                                                onChange={(e) => setCustomAmount(e.target.value)}
                                                placeholder="0.00"
                                                className="w-full pl-10 pr-4 py-3 bg-white/5 border-2 border-glass-border rounded-lg text-text-light placeholder-text-muted-dark focus:border-primary-violet focus:shadow-glow-soft focus:outline-none transition-smooth"
                                            />
                                        </div>
                                        <button
                                            onClick={() => {
                                                if (customAmount && parseFloat(customAmount) > 0) {
                                                    handleMealClick({ type: 'custom', label: 'Custom Amount', price: parseFloat(customAmount) });
                                                    setCustomAmount('');
                                                }
                                            }}
                                            disabled={!customAmount || parseFloat(customAmount) <= 0 || loading}
                                            className="px-8 py-3 bg-gradient-button rounded-lg text-white font-semibold hover:scale-105 transition-smooth shadow-glow-soft disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Charge
                                        </button>
                                    </div>
                                </div>

                                {/* Status Messages */}
                                {paymentStatus === 'success' && (
                                    <SuccessMessage message="Payment Successful!" />
                                )}
                                {paymentStatus === 'error' && (
                                    <ErrorMessage message={errorMessage} />
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Transactions (Right - 1 column) */}
                <div className="lg:col-span-1">
                    <div className="glass-card p-6 fade-in-up sticky top-4">
                        <h3 className="text-lg font-bold text-text-light mb-4 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-primary-violet" />
                            Recent Transactions
                        </h3>
                        <div className="space-y-3 max-h-[600px] overflow-y-auto">
                            {recentTransactions.map((txn) => (
                                <div key={txn.id} className="p-3 bg-white/5 rounded-lg border border-glass-border hover:border-glass-border-hover transition-smooth">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <div className="font-semibold text-text-light text-sm">{txn.student}</div>
                                            <div className="text-xs text-text-muted-dark">{txn.rollNo}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-bold text-primary-violet">{formatCurrency(txn.amount)}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-text-muted-dark">{txn.meal}</span>
                                        <span className="text-text-muted-dark">{formatRelativeDate(txn.time)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {selectedMeal && (
                <ConfirmationModal
                    isOpen={showConfirmModal}
                    onClose={() => {
                        setShowConfirmModal(false);
                        setSelectedMeal(null);
                    }}
                    onConfirm={confirmPayment}
                    title="Confirm Payment"
                    message={
                        <div className="space-y-3">
                            <div className="p-4 bg-white/5 rounded-lg">
                                <div className="flex justify-between mb-2">
                                    <span className="text-text-muted-dark">Student:</span>
                                    <span className="text-text-light font-semibold">{student?.name}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-text-muted-dark">Meal:</span>
                                    <span className="text-text-light font-semibold">{selectedMeal.label}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-text-muted-dark">Amount:</span>
                                    <span className="text-primary-violet font-bold">{formatCurrency(selectedMeal.price)}</span>
                                </div>
                                <div className="h-px bg-glass-border my-2"></div>
                                <div className="flex justify-between">
                                    <span className="text-text-muted-dark">New Balance:</span>
                                    <span className="text-text-light font-bold">
                                        {formatCurrency(student ? student.mess_balance - selectedMeal.price : 0)}
                                    </span>
                                </div>
                            </div>
                            <p className="text-sm text-text-muted-dark">
                                Confirm this transaction?
                            </p>
                        </div>
                    }
                    confirmText="Confirm Payment"
                    type="info"
                    loading={loading}
                />
            )}
        </div>
    );
};

export default MessTerminal;
