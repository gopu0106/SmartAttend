import React, { useState } from 'react';
import { Settings, CheckCircle, XCircle, DollarSign, Users, TrendingUp, Shield, Activity, Clock, Search, Mail, Phone, CreditCard } from 'lucide-react';
import GlowButton from '../components/ui/GlowButton';
import NetworkStatus from '../components/ui/NetworkStatus';
import { DEMO_STUDENTS, DEMO_ATTENDANCE_RECORDS, DEMO_TRANSACTIONS, DEFAULT_SYSTEM_SETTINGS } from '../constants/mockData';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('redemptions');
    const [studentSearch, setStudentSearch] = useState('');
    const [rates, setRates] = useState({
        coinToRupee: DEFAULT_SYSTEM_SETTINGS.coinToRupeeRate,
        coinsPerAttendance: DEFAULT_SYSTEM_SETTINGS.coinsPerAttendance,
        minRedemption: DEFAULT_SYSTEM_SETTINGS.minRedemptionCoins,
        dailySpendingLimit: DEFAULT_SYSTEM_SETTINGS.dailySpendingLimit,
        attendanceGracePeriod: DEFAULT_SYSTEM_SETTINGS.attendanceGracePeriod,
        messTimings: DEFAULT_SYSTEM_SETTINGS.messTimings
    });

    // Filter students based on search
    const filteredStudents = DEMO_STUDENTS.filter(s =>
        s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
        s.enrollmentId.toLowerCase().includes(studentSearch.toLowerCase()) ||
        s.department.toLowerCase().includes(studentSearch.toLowerCase())
    );

    const [redemptions, setRedemptions] = useState([
        { id: 1, user: 'John Doe', amount: 100, type: 'Mess Credit', date: '2025-12-01', status: 'pending' },
        { id: 2, user: 'Jane Smith', amount: 50, type: 'Voucher', date: '2025-12-01', status: 'pending' },
        { id: 3, user: 'Mike Johnson', amount: 200, type: 'Mess Credit', date: '2025-11-30', status: 'approved' },
    ]);

    const handleApprove = (id) => {
        setRedemptions(redemptions.map(r =>
            r.id === id ? { ...r, status: 'approved' } : r
        ));
    };

    const handleReject = (id) => {
        setRedemptions(redemptions.map(r =>
            r.id === id ? { ...r, status: 'rejected' } : r
        ));
    };

    const handleRateUpdate = (e) => {
        e.preventDefault();
        alert('System rates updated successfully!');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 fade-in-up">
            {/* Header with System Status */}
            <header className="mb-8 relative">
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                        <div className="p-4 bg-primary-violet/20 rounded-xl border border-primary-violet/30">
                            <Shield className="w-8 h-8 text-primary-violet" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-text-light flex items-center gap-3">
                                Admin Command Center
                            </h1>
                            <p className="text-text-muted-dark mt-2">System Overview & Configuration</p>
                        </div>
                    </div>
                    <NetworkStatus />
                </div>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="glass-card p-6 border border-glass-border hover-lift transition-smooth group">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-text-muted-dark font-medium text-xs uppercase tracking-wide mb-1">Pending Requests</h3>
                            <div className="text-sm text-orange-400 flex items-center gap-1">
                                <Activity className="w-3 h-3" />
                                <span>Requires Action</span>
                            </div>
                        </div>
                        <div className="p-3 bg-orange-500/20 rounded-xl border border-orange-500/30 group-hover:scale-110 transition-smooth">
                            <Users className="w-6 h-6 text-orange-400" />
                        </div>
                    </div>
                    <div className="text-5xl font-bold text-text-light">
                        {redemptions.filter(r => r.status === 'pending').length}
                    </div>
                </div>
                <div className="glass-card p-6 border border-glass-border hover-lift transition-smooth group">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-text-muted-dark font-medium text-xs uppercase tracking-wide mb-1">Total Circulation</h3>
                            <div className="text-sm text-secondary-cyan">Coins in student wallets</div>
                        </div>
                        <div className="p-3 bg-secondary-cyan/20 rounded-xl border border-secondary-cyan/30 group-hover:scale-110 transition-smooth">
                            <TrendingUp className="w-6 h-6 text-secondary-cyan" />
                        </div>
                    </div>
                    <div className="text-5xl font-bold text-text-light">12,450</div>
                </div>
                <div className="glass-card p-6 border border-glass-border hover-lift transition-smooth group">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-text-muted-dark font-medium text-xs uppercase tracking-wide mb-1">Exchange Rate</h3>
                            <div className="text-sm text-green-400">Current Base Rate</div>
                        </div>
                        <div className="p-3 bg-green-500/20 rounded-xl border border-green-500/30 group-hover:scale-110 transition-smooth">
                            <DollarSign className="w-6 h-6 text-green-400" />
                        </div>
                    </div>
                    <div className="text-5xl font-bold text-text-light">₹{rates.coinToRupee}</div>
                </div>
            </div>

            {/* Main Content Tabs */}
            <div className="glass-card rounded-card-glass overflow-hidden shadow-glass">
                {/* Tab Navigation */}
                <div className="border-b border-glass-border bg-white/5">
                    <nav className="flex gap-1 px-6">
                        <button
                            onClick={() => setActiveTab('redemptions')}
                            className={`relative px-4 py-4 font-medium text-xs uppercase tracking-wider transition-smooth ${activeTab === 'redemptions'
                                ? 'text-secondary-cyan'
                                : 'text-text-muted-dark hover:text-text-light'
                                }`}
                        >
                            Redemption Requests
                            {activeTab === 'redemptions' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary-cyan shadow-glow-soft"></div>
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('students')}
                            className={`relative px-4 py-4 font-medium text-xs uppercase tracking-wider transition-smooth ${activeTab === 'students'
                                ? 'text-secondary-cyan'
                                : 'text-text-muted-dark hover:text-text-light'
                                }`}
                        >
                            Student Directory
                            {activeTab === 'students' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary-cyan shadow-glow-soft"></div>
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('attendance')}
                            className={`relative px-4 py-4 font-medium text-xs uppercase tracking-wider transition-smooth ${activeTab === 'attendance'
                                ? 'text-secondary-cyan'
                                : 'text-text-muted-dark hover:text-text-light'
                                }`}
                        >
                            Attendance Log
                            {activeTab === 'attendance' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary-cyan shadow-glow-soft"></div>
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('transactions')}
                            className={`relative px-4 py-4 font-medium text-xs uppercase tracking-wider transition-smooth ${activeTab === 'transactions'
                                ? 'text-secondary-cyan'
                                : 'text-text-muted-dark hover:text-text-light'
                                }`}
                        >
                            Transaction History
                            {activeTab === 'transactions' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary-cyan shadow-glow-soft"></div>
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`relative px-4 py-4 font-medium text-xs uppercase tracking-wider transition-smooth ${activeTab === 'settings'
                                ? 'text-secondary-cyan'
                                : 'text-text-muted-dark hover:text-text-light'
                                }`}
                        >
                            System Settings
                            {activeTab === 'settings' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary-cyan shadow-glow-soft"></div>
                            )}
                        </button>
                    </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    {activeTab === 'redemptions' ? (
                        <div className="overflow-x-auto">
                            <div className="flex items-center gap-2 mb-4">
                                <Activity className="w-5 h-5 text-orange-400" />
                                <h2 className="text-lg font-semibold text-text-light">Redemption Requests</h2>
                            </div>
                            <table className="w-full">
                                <thead className="bg-white/5 rounded-lg">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted-dark uppercase">User</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted-dark uppercase">Amount</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted-dark uppercase">Type</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted-dark uppercase">Date</th>
                                        <th className="px-4 py-3 text-center text-xs font-semibold text-text-muted-dark uppercase">Status</th>
                                        <th className="px-4 py-3 text-right text-xs font-semibold text-text-muted-dark uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-glass-border">
                                    {redemptions.map((request) => (
                                        <tr key={request.id} className="hover:bg-white/5 transition-smooth">
                                            <td className="px-4 py-4 font-medium text-text-light">{request.user}</td>
                                            <td className="px-4 py-4 text-text-muted-dark">{request.amount} Coins</td>
                                            <td className="px-4 py-4 text-text-muted-dark">{request.type}</td>
                                            <td className="px-4 py-4 text-text-muted-dark text-sm">{request.date}</td>
                                            <td className="px-4 py-4 text-center">
                                                <span className={`status-pill status-pill--${request.status}`}>
                                                    {request.status === 'pending' && (
                                                        <span className="pulsing-dot bg-yellow-400"></span>
                                                    )}
                                                    {request.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                {request.status === 'pending' && (
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => handleApprove(request.id)}
                                                            className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 hover:bg-green-500/30 hover:scale-110 transition-smooth flex items-center justify-center"
                                                            title="Approve"
                                                        >
                                                            <CheckCircle className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleReject(request.id)}
                                                            className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30 hover:scale-110 transition-smooth flex items-center justify-center"
                                                            title="Reject"
                                                        >
                                                            <XCircle className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : activeTab === 'students' ? (
                        <div>
                            {/* Search Bar */}
                            <div className="mb-4 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted-dark" />
                                <input
                                    type="text"
                                    placeholder="Search students by name, ID, or department..."
                                    value={studentSearch}
                                    onChange={(e) => setStudentSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-glass-border rounded-lg text-text-light placeholder-text-muted-dark focus:border-primary-violet focus:outline-none transition-smooth"
                                />
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-white/5 rounded-lg">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted-dark uppercase">Student</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted-dark uppercase">Enrollment ID</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted-dark uppercase">Department</th>
                                            <th className="px-4 py-3 text-center text-xs font-semibold text-text-muted-dark uppercase">Year</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted-dark uppercase">Mess Plan</th>
                                            <th className="px-4 py-3 text-right text-xs font-semibold text-text-muted-dark uppercase">Credits (₹)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-glass-border">
                                        {filteredStudents.map((student) => (
                                            <tr key={student.id} className="hover:bg-white/5 transition-smooth">
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-violet to-secondary-cyan flex items-center justify-center text-white font-semibold text-sm">
                                                            {student.name.split(' ').map(n => n[0]).join('')}
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-text-light">{student.name}</div>
                                                            <div className="text-xs text-text-muted-dark flex items-center gap-1">
                                                                <Mail className="w-3 h-3" />{student.email}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 font-mono text-sm text-text-light">{student.enrollmentId}</td>
                                                <td className="px-4 py-4 text-text-muted-dark">{student.department}</td>
                                                <td className="px-4 py-4 text-center">
                                                    <span className="px-2 py-1 bg-primary-violet/20 text-primary-violet rounded-full text-xs font-semibold">Year {student.year}</span>
                                                </td>
                                                <td className="px-4 py-4 text-text-muted-dark">{student.messPlan}</td>
                                                <td className="px-4 py-4 text-right font-semibold text-green-400">₹{student.credits.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="mt-4 text-center text-sm text-text-muted-dark">
                                    Showing {filteredStudents.length} of {DEMO_STUDENTS.length} students
                                </div>
                            </div>
                        </div>
                    ) : activeTab === 'attendance' ? (
                        <div className="overflow-x-auto">
                            <div className="flex items-center gap-2 mb-4">
                                <Clock className="w-5 h-5 text-secondary-cyan" />
                                <h2 className="text-lg font-semibold text-text-light">Recent Attendance Records</h2>
                            </div>
                            <table className="w-full">
                                <thead className="bg-white/5 rounded-lg">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted-dark uppercase">Student</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted-dark uppercase">Date</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted-dark uppercase">Time</th>
                                        <th className="px-4 py-3 text-center text-xs font-semibold text-text-muted-dark uppercase">Status</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted-dark uppercase">Marked By</th>
                                        <th className="px-4 py-3 text-center text-xs font-semibold text-text-muted-dark uppercase">Method</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-glass-border">
                                    {DEMO_ATTENDANCE_RECORDS.map((record) => (
                                        <tr key={record.id} className="hover:bg-white/5 transition-smooth">
                                            <td className="px-4 py-4">
                                                <div className="font-medium text-text-light">{record.studentName}</div>
                                                <div className="text-xs text-text-muted-dark font-mono">{record.studentId}</div>
                                            </td>
                                            <td className="px-4 py-4 text-text-muted-dark">{record.date}</td>
                                            <td className="px-4 py-4 text-text-muted-dark">{record.time}</td>
                                            <td className="px-4 py-4 text-center">
                                                <span className={`status-pill status-pill--${record.status}`}>
                                                    <span className={`pulsing-dot ${record.status === 'present' ? 'bg-green-400' : record.status === 'absent' ? 'bg-red-400' : 'bg-yellow-400'}`}></span>
                                                    {record.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-text-muted-dark">{record.markedBy}</td>
                                            <td className="px-4 py-4 text-center">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${record.method === 'QR' ? 'bg-secondary-cyan/20 text-secondary-cyan' : 'bg-orange-500/20 text-orange-400'}`}>
                                                    {record.method}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="mt-4 text-center text-sm text-text-muted-dark">
                                Showing {DEMO_ATTENDANCE_RECORDS.length} attendance records
                            </div>
                        </div>
                    ) : activeTab === 'transactions' ? (
                        <div className="overflow-x-auto">
                            <div className="flex items-center gap-2 mb-4">
                                <CreditCard className="w-5 h-5 text-green-400" />
                                <h2 className="text-lg font-semibold text-text-light">Transaction History</h2>
                            </div>
                            <table className="w-full">
                                <thead className="bg-white/5 rounded-lg">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted-dark uppercase">Transaction ID</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted-dark uppercase">Student</th>
                                        <th className="px-4 py-3 text-right text-xs font-semibold text-text-muted-dark uppercase">Amount</th>
                                        <th className="px-4 py-3 text-center text-xs font-semibold text-text-muted-dark uppercase">Type</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted-dark uppercase">Description</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-text-muted-dark uppercase">Date/Time</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-glass-border">
                                    {DEMO_TRANSACTIONS.map((txn) => (
                                        <tr key={txn.id} className="hover:bg-white/5 transition-smooth">
                                            <td className="px-4 py-4 font-mono text-sm text-primary-violet">{txn.id}</td>
                                            <td className="px-4 py-4">
                                                <div className="font-medium text-text-light">{txn.studentName}</div>
                                                <div className="text-xs text-text-muted-dark font-mono">{txn.studentId}</div>
                                            </td>
                                            <td className={`px-4 py-4 text-right font-bold ${txn.type === 'Credit' ? 'text-green-400' : 'text-red-400'}`}>
                                                {txn.type === 'Credit' ? '+' : '-'}₹{txn.amount.toFixed(2)}
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${txn.type === 'Credit' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                                    {txn.type}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-text-muted-dark">{txn.description}</td>
                                            <td className="px-4 py-4 text-text-muted-dark text-sm">{txn.date} {txn.time}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="mt-4 flex justify-between items-center text-sm text-text-muted-dark">
                                <span>Showing {DEMO_TRANSACTIONS.length} transactions</span>
                                <div className="flex gap-4">
                                    <span className="text-green-400">Total Credits: ₹{DEMO_TRANSACTIONS.filter(t => t.type === 'Credit').reduce((sum, t) => sum + t.amount, 0).toFixed(2)}</span>
                                    <span className="text-red-400">Total Debits: ₹{DEMO_TRANSACTIONS.filter(t => t.type === 'Debit').reduce((sum, t) => sum + t.amount, 0).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleRateUpdate} className="max-w-2xl">
                            <div className="space-y-6">
                                {/* Info Banner */}
                                <div className="glass-card border border-primary-violet/30 p-4 rounded-lg bg-primary-violet/10">
                                    <h3 className="font-semibold text-primary-violet flex items-center gap-2 mb-1">
                                        <Settings className="w-5 h-5" /> Configuration
                                    </h3>
                                    <p className="text-text-muted-dark text-sm">
                                        These settings affect the entire system immediately.
                                    </p>
                                </div>

                                {/* Settings Form */}
                                <div className="grid gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-text-light mb-2">
                                            Coin to Rupee Exchange Rate
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted-dark">₹</span>
                                            <input
                                                type="number"
                                                step="0.1"
                                                value={rates.coinToRupee}
                                                onChange={(e) => setRates({ ...rates, coinToRupee: e.target.value })}
                                                className="w-full pl-8 pr-4 py-3 bg-white/5 border border-glass-border rounded-lg text-text-light focus:border-primary-violet focus:shadow-glow-soft focus:outline-none transition-smooth"
                                            />
                                        </div>
                                        <p className="text-xs text-text-muted-dark mt-1">Value of 1 Coin in Rupees</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-text-light mb-2">
                                            Coins Per Attendance
                                        </label>
                                        <input
                                            type="number"
                                            value={rates.coinsPerAttendance}
                                            onChange={(e) => setRates({ ...rates, coinsPerAttendance: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-glass-border rounded-lg text-text-light focus:border-primary-violet focus:shadow-glow-soft focus:outline-none transition-smooth"
                                        />
                                        <p className="text-xs text-text-muted-dark mt-1">Coins credited for each day of attendance</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-text-light mb-2">
                                            Minimum Redemption Amount
                                        </label>
                                        <input
                                            type="number"
                                            value={rates.minRedemption}
                                            onChange={(e) => setRates({ ...rates, minRedemption: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-glass-border rounded-lg text-text-light focus:border-primary-violet focus:shadow-glow-soft focus:outline-none transition-smooth"
                                        />
                                        <p className="text-xs text-text-muted-dark mt-1">Minimum coins required to request redemption</p>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <GlowButton type="submit">
                                        Save Changes
                                    </GlowButton>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
