import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Wallet, History, Gift, ArrowUpRight, ArrowDownLeft, TrendingUp, CreditCard, UserCheck, AlertCircle, Lock } from 'lucide-react';
import { useAnimatedRef } from '../contexts/AnimationProvider';
import Card from '../components/ui/Card';
import PrimaryButton from '../components/ui/PrimaryButton';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function StudentDashboard() {
    const [wallet, setWallet] = useState({ coin_balance: 0, mess_balance: 0 });
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [redeemAmount, setRedeemAmount] = useState('');
    const [user, setUser] = useState(null);
    const attendance = { percentage: 87, total_classes: 120, attended: 104 };

    // Animated refs
    const headerTitleRef = useAnimatedRef({ delay: 40 });
    const dateRef = useAnimatedRef({ delay: 160 });
    const coinCardRef = useAnimatedRef({ delay: 200 });
    const messCardRef = useAnimatedRef({ delay: 320 });
    const attendanceCardRef = useAnimatedRef({ delay: 440 });
    const redeemBoxRef = useAnimatedRef({ delay: 560 });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem('user'));
                setUser(storedUser);

                if (storedUser) {
                    const response = await api.get(`/wallets/users/${storedUser.id}/wallet`);
                    setWallet(response.data.wallet || { coin_balance: 0, mess_balance: 0 });

                    const coinTx = (response.data.coin_transactions?.recent || []).map(tx => ({
                        ...tx,
                        type: tx.amount > 0 ? 'credit' : 'debit',
                        category: 'coin',
                        description: tx.description || (tx.amount > 0 ? 'Coin Credit' : 'Coin Debit')
                    }));

                    const messTx = (response.data.mess_transactions?.recent || []).map(tx => ({
                        ...tx,
                        type: tx.amount > 0 ? 'credit' : 'debit',
                        category: 'mess',
                        description: tx.description || (tx.amount > 0 ? 'Mess Credit' : 'Mess Debit')
                    }));

                    const allTx = [...coinTx, ...messTx].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    setTransactions(allTx);
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const handleRedeem = async (e) => {
        e.preventDefault();
        try {
            await api.post('/wallets/redeem', {
                coins_to_redeem: parseInt(redeemAmount, 10),
                redemption_type: 'mess_credit'
            });

            alert(`Redemption request for ${redeemAmount} coins submitted!`);
            setRedeemAmount('');

            const storedUser = JSON.parse(localStorage.getItem('user'));
            const response = await api.get(`/wallets/users/${storedUser.id}/wallet`);
            setWallet(response.data.wallet);
        } catch (error) {
            alert(error.response?.data?.error || 'Redemption failed');
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center py-20">
            <LoadingSpinner size="lg" />
        </div>
    );

    function TransactionItem({ tx, idx }) {
        const txRef = useAnimatedRef({ delay: idx * 80 });
        return (
            <div
                ref={txRef}
                className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between border-b border-gray-100 last:border-0"
            >
                <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'credit'
                        ? 'bg-emerald-100 text-emerald-600'
                        : 'bg-red-100 text-red-600'
                        }`}>
                        {tx.type === 'credit' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                    </div>
                    <div>
                        <div className="font-semibold text-gray-900">
                            {tx.description}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-2">
                            <span>{new Date(tx.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                            <span className="capitalize">{tx.category} Wallet</span>
                        </div>
                    </div>
                </div>
                <div className={`font-bold ${tx.type === 'credit' ? 'text-emerald-600' : 'text-red-600'}`}>
                    {tx.type === 'credit' ? '+' : '-'}{tx.amount} <span className="text-xs text-gray-500">{tx.category === 'coin' ? 'C' : '₹'}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            {/* Header */}
            <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between">
                <div>
                    <p className="text-white/70 font-medium mb-1">Welcome back,</p>
                    <h1
                        ref={headerTitleRef}
                        className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
                    >
                        {user?.full_name || 'Student'}
                    </h1>
                </div>
                <div
                    ref={dateRef}
                    className="mt-4 md:mt-0 text-white/90 text-sm font-medium bg-white/10 backdrop-blur-md px-4 py-2 rounded-button border border-white/10"
                >
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </header>

            {/* Balance & Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Coin Wallet Card */}
                <div ref={coinCardRef}>
                    <Card gradient className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Wallet size={100} />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-accent-purple/20 rounded-xl text-accent-purple">
                                    <Wallet className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Attendance Coins</h3>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-5xl font-extrabold text-gray-900">{wallet.coin_balance}</span>
                                <span className="text-lg font-medium text-gray-600">coins</span>
                            </div>
                            <div className="mt-6 flex items-center justify-between text-sm">
                                <span className="text-gray-600 font-medium">Available Balance</span>
                                <span className="text-emerald-600 flex items-center gap-1 font-semibold bg-emerald-100 px-2 py-1 rounded-full">
                                    <ArrowUpRight className="w-3 h-3" /> Active
                                </span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Mess Balance Card */}
                <div ref={messCardRef}>
                    <Card gradient className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <CreditCard size={100} />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-accent-indigo/20 rounded-xl text-accent-indigo">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Mess Credit</h3>
                                <div className="ml-auto p-1.5 bg-gray-100/50 rounded-lg" title="Credits locked by Admin">
                                    <Lock className="w-4 h-4 text-gray-500" />
                                </div>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-5xl font-extrabold text-gray-900">₹{parseFloat(wallet.mess_balance).toFixed(2)}</span>
                            </div>
                            <div className="mt-6 flex items-center justify-between text-sm">
                                <span className="text-gray-600 font-medium">Prepaid Balance</span>
                                <span className="text-accent-indigo flex items-center gap-1 font-semibold bg-blue-100 px-2 py-1 rounded-full">
                                    <ArrowUpRight className="w-3 h-3" /> Ready
                                </span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Attendance Card */}
                <div ref={attendanceCardRef}>
                    <Card gradient className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 md:col-span-2 lg:col-span-1">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <UserCheck size={100} />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-accent-pink/20 rounded-xl text-accent-pink">
                                    <UserCheck className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Current Attendance</h3>
                            </div>
                            <div className="flex items-baseline gap-3">
                                <span className="text-5xl font-extrabold text-gray-900">{attendance.percentage}%</span>
                                <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden self-center">
                                    <div className="h-full bg-gradient-to-r from-accent-pink to-accent-purple" style={{ width: `${attendance.percentage}%` }}></div>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-between text-sm">
                                <div>
                                    <span className="text-gray-500 text-xs">Total: </span>
                                    <span className="text-gray-900 font-bold">{attendance.total_classes}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500 text-xs">Attended: </span>
                                    <span className="text-gray-900 font-bold">{attendance.attended}</span>
                                </div>
                                <span className={`flex items-center gap-1 font-semibold px-2 py-1 rounded-full ${attendance.percentage >= 75
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : 'bg-red-100 text-red-700'
                                    }`}>
                                    {attendance.percentage >= 75 ? <UserCheck className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                    {attendance.percentage >= 75 ? 'Safe' : 'Low'}
                                </span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2">
                    <Card padding={false}>
                        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                            <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <History className="w-5 h-5 text-accent-purple" />
                                Recent Activity
                            </h4>
                            <button className="text-sm font-medium text-accent-indigo hover:text-accent-purple transition-colors">View All</button>
                        </div>
                        <div className="max-h-[500px] overflow-y-auto">
                            {transactions.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                                    <History className="w-12 h-12 mb-3 opacity-20" />
                                    <p>No recent transactions found</p>
                                </div>
                            ) : (
                                <div>
                                    {transactions.map((tx, idx) => (
                                        <TransactionItem key={idx} tx={tx} idx={idx} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </Card>
                </div>

                {/* Redemption Section */}
                <div className="lg:col-span-1">
                    <div ref={redeemBoxRef}>
                        <Card>
                            <div className="mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-accent-purple to-accent-pink rounded-xl flex items-center justify-center mb-4 shadow-elevation">
                                    <Gift className="w-6 h-6 text-white" />
                                </div>
                                <h4 className="text-xl font-bold text-gray-900">Redeem Coins</h4>
                                <p className="text-gray-600 text-sm mt-1">Convert your attendance coins into mess credit instantly.</p>
                            </div>

                            <form onSubmit={handleRedeem} className="space-y-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm font-semibold text-gray-700">Amount to Redeem</label>
                                        <span className="text-xs text-gray-500">Balance: <span className="text-gray-900 font-bold">{wallet.coin_balance}</span></span>
                                    </div>

                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={redeemAmount}
                                            onChange={(e) => setRedeemAmount(e.target.value)}
                                            placeholder="0"
                                            className="w-full pl-4 pr-20 py-4 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-accent-indigo focus:border-transparent outline-none font-bold text-2xl text-gray-900 placeholder:text-gray-300"
                                            min="1"
                                            max={wallet.coin_balance}
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                            <span className="text-xs font-bold text-gray-500">COINS</span>
                                            <button
                                                type="button"
                                                onClick={() => setRedeemAmount(wallet.coin_balance)}
                                                className="bg-accent-indigo/10 hover:bg-accent-indigo/20 text-accent-indigo text-xs font-bold px-2 py-1 rounded-md border border-accent-indigo/20 transition-colors"
                                            >
                                                Max
                                            </button>
                                        </div>
                                    </div>

                                    {/* Preset Chips */}
                                    <div className="flex flex-wrap gap-2">
                                        {[50, 100, 200, 500].map((amount) => (
                                            <button
                                                key={amount}
                                                type="button"
                                                onClick={() => setRedeemAmount(amount)}
                                                disabled={wallet.coin_balance < amount}
                                                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${wallet.coin_balance < amount
                                                    ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                                                    : redeemAmount == amount
                                                        ? 'bg-accent-indigo/20 border-accent-indigo text-accent-indigo'
                                                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {amount}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-4">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs font-medium text-gray-500 uppercase">Exchange Rate</span>
                                        <span className="text-xs font-bold text-accent-indigo bg-accent-indigo/10 px-2 py-1 rounded-md">1 Coin = ₹1.00</span>
                                    </div>
                                    <div className="flex justify-between items-end pt-3">
                                        <span className="text-sm font-medium text-gray-600">You receive</span>
                                        <span className="text-2xl font-bold text-accent-indigo">₹{redeemAmount ? parseInt(redeemAmount).toLocaleString() : '0'}</span>
                                    </div>
                                </div>

                                <PrimaryButton
                                    type="submit"
                                    disabled={!redeemAmount || redeemAmount <= 0 || redeemAmount > wallet.coin_balance}
                                    className="w-full"
                                >
                                    <span className="flex items-center justify-center gap-2">
                                        Confirm Redemption
                                        <ArrowUpRight className="w-4 h-4" />
                                    </span>
                                </PrimaryButton>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}