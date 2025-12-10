/**
 * Mock Data for SmartAttend Mess Portal
 * Consistent sample data used across Student Directory, Attendance Log, 
 * Transaction History, and System Settings.
 */

// Demo Students - 15 students with consistent data
export const DEMO_STUDENTS = [
    { id: 1, name: 'Rahul Sharma', enrollmentId: 'CSE2024001', department: 'Computer Science', year: 2, email: 'rahul.sharma@college.edu', phone: '9876543210', messPlan: 'Full Board', credits: 1250.00 },
    { id: 2, name: 'Priya Patel', enrollmentId: 'CSE2024002', department: 'Computer Science', year: 2, email: 'priya.patel@college.edu', phone: '9876543211', messPlan: 'Half Board', credits: 850.50 },
    { id: 3, name: 'Amit Kumar', enrollmentId: 'ECE2024003', department: 'Electronics', year: 2, email: 'amit.kumar@college.edu', phone: '9876543212', messPlan: 'Full Board', credits: 1100.00 },
    { id: 4, name: 'Sneha Reddy', enrollmentId: 'CSE2024004', department: 'Computer Science', year: 3, email: 'sneha.reddy@college.edu', phone: '9876543213', messPlan: 'Full Board', credits: 2200.75 },
    { id: 5, name: 'Vikram Singh', enrollmentId: 'ME2024005', department: 'Mechanical', year: 1, email: 'vikram.singh@college.edu', phone: '9876543214', messPlan: 'Breakfast Only', credits: 450.00 },
    { id: 6, name: 'Ananya Gupta', enrollmentId: 'CSE2024006', department: 'Computer Science', year: 4, email: 'ananya.gupta@college.edu', phone: '9876543215', messPlan: 'Full Board', credits: 3100.25 },
    { id: 7, name: 'Karthik Nair', enrollmentId: 'ECE2024007', department: 'Electronics', year: 3, email: 'karthik.nair@college.edu', phone: '9876543216', messPlan: 'Half Board', credits: 920.00 },
    { id: 8, name: 'Meera Joshi', enrollmentId: 'IT2024008', department: 'Information Technology', year: 2, email: 'meera.joshi@college.edu', phone: '9876543217', messPlan: 'Full Board', credits: 1580.50 },
    { id: 9, name: 'Arjun Menon', enrollmentId: 'CSE2024009', department: 'Computer Science', year: 1, email: 'arjun.menon@college.edu', phone: '9876543218', messPlan: 'Full Board', credits: 780.00 },
    { id: 10, name: 'Divya Krishnan', enrollmentId: 'CE2024010', department: 'Civil', year: 2, email: 'divya.krishnan@college.edu', phone: '9876543219', messPlan: 'Half Board', credits: 650.75 },
    { id: 11, name: 'Rohan Verma', enrollmentId: 'CSE2024011', department: 'Computer Science', year: 3, email: 'rohan.verma@college.edu', phone: '9876543220', messPlan: 'Full Board', credits: 1890.00 },
    { id: 12, name: 'Kavitha Rajan', enrollmentId: 'ECE2024012', department: 'Electronics', year: 4, email: 'kavitha.rajan@college.edu', phone: '9876543221', messPlan: 'Full Board', credits: 2750.25 },
    { id: 13, name: 'Sanjay Das', enrollmentId: 'ME2024013', department: 'Mechanical', year: 2, email: 'sanjay.das@college.edu', phone: '9876543222', messPlan: 'Breakfast Only', credits: 320.00 },
    { id: 14, name: 'Nisha Agarwal', enrollmentId: 'IT2024014', department: 'Information Technology', year: 1, email: 'nisha.agarwal@college.edu', phone: '9876543223', messPlan: 'Full Board', credits: 680.50 },
    { id: 15, name: 'Aditya Rao', enrollmentId: 'CSE2024015', department: 'Computer Science', year: 2, email: 'aditya.rao@college.edu', phone: '9876543224', messPlan: 'Half Board', credits: 1120.00 },
];

// Demo Attendance Records - 20 records with various statuses
export const DEMO_ATTENDANCE_RECORDS = [
    { id: 1, studentId: 'CSE2024001', studentName: 'Rahul Sharma', date: '2025-12-10', time: '09:15 AM', status: 'present', markedBy: 'Dr. Anil Kumar', method: 'QR' },
    { id: 2, studentId: 'CSE2024002', studentName: 'Priya Patel', date: '2025-12-10', time: '09:18 AM', status: 'present', markedBy: 'Dr. Anil Kumar', method: 'QR' },
    { id: 3, studentId: 'ECE2024003', studentName: 'Amit Kumar', date: '2025-12-10', time: '09:35 AM', status: 'late', markedBy: 'Dr. Anil Kumar', method: 'Manual' },
    { id: 4, studentId: 'CSE2024004', studentName: 'Sneha Reddy', date: '2025-12-10', time: '09:10 AM', status: 'present', markedBy: 'Prof. Meera Shah', method: 'QR' },
    { id: 5, studentId: 'ME2024005', studentName: 'Vikram Singh', date: '2025-12-10', time: '-', status: 'absent', markedBy: 'Prof. Meera Shah', method: 'Manual' },
    { id: 6, studentId: 'CSE2024006', studentName: 'Ananya Gupta', date: '2025-12-09', time: '09:05 AM', status: 'present', markedBy: 'Dr. Anil Kumar', method: 'QR' },
    { id: 7, studentId: 'ECE2024007', studentName: 'Karthik Nair', date: '2025-12-09', time: '09:22 AM', status: 'present', markedBy: 'Dr. Anil Kumar', method: 'QR' },
    { id: 8, studentId: 'IT2024008', studentName: 'Meera Joshi', date: '2025-12-09', time: '-', status: 'absent', markedBy: 'Prof. Suresh Iyer', method: 'Manual' },
    { id: 9, studentId: 'CSE2024009', studentName: 'Arjun Menon', date: '2025-12-09', time: '09:45 AM', status: 'late', markedBy: 'Prof. Suresh Iyer', method: 'Manual' },
    { id: 10, studentId: 'CE2024010', studentName: 'Divya Krishnan', date: '2025-12-09', time: '09:12 AM', status: 'present', markedBy: 'Dr. Priya Nair', method: 'QR' },
    { id: 11, studentId: 'CSE2024011', studentName: 'Rohan Verma', date: '2025-12-08', time: '09:08 AM', status: 'present', markedBy: 'Dr. Anil Kumar', method: 'QR' },
    { id: 12, studentId: 'ECE2024012', studentName: 'Kavitha Rajan', date: '2025-12-08', time: '09:20 AM', status: 'present', markedBy: 'Dr. Anil Kumar', method: 'QR' },
    { id: 13, studentId: 'ME2024013', studentName: 'Sanjay Das', date: '2025-12-08', time: '-', status: 'absent', markedBy: 'Prof. Meera Shah', method: 'Manual' },
    { id: 14, studentId: 'IT2024014', studentName: 'Nisha Agarwal', date: '2025-12-08', time: '09:30 AM', status: 'late', markedBy: 'Prof. Suresh Iyer', method: 'Manual' },
    { id: 15, studentId: 'CSE2024015', studentName: 'Aditya Rao', date: '2025-12-08', time: '09:05 AM', status: 'present', markedBy: 'Prof. Suresh Iyer', method: 'QR' },
    { id: 16, studentId: 'CSE2024001', studentName: 'Rahul Sharma', date: '2025-12-07', time: '09:10 AM', status: 'present', markedBy: 'Dr. Anil Kumar', method: 'QR' },
    { id: 17, studentId: 'CSE2024002', studentName: 'Priya Patel', date: '2025-12-07', time: '-', status: 'absent', markedBy: 'Dr. Anil Kumar', method: 'Manual' },
    { id: 18, studentId: 'ECE2024003', studentName: 'Amit Kumar', date: '2025-12-07', time: '09:25 AM', status: 'present', markedBy: 'Dr. Priya Nair', method: 'QR' },
    { id: 19, studentId: 'CSE2024004', studentName: 'Sneha Reddy', date: '2025-12-07', time: '09:08 AM', status: 'present', markedBy: 'Dr. Priya Nair', method: 'QR' },
    { id: 20, studentId: 'ME2024005', studentName: 'Vikram Singh', date: '2025-12-07', time: '09:40 AM', status: 'late', markedBy: 'Prof. Meera Shah', method: 'Manual' },
];

// Demo Transactions - 15 transactions
export const DEMO_TRANSACTIONS = [
    { id: 'TXN001', studentId: 'CSE2024001', studentName: 'Rahul Sharma', amount: 500.00, type: 'Credit', description: 'Mess recharge', date: '2025-12-10', time: '10:30 AM' },
    { id: 'TXN002', studentId: 'CSE2024002', studentName: 'Priya Patel', amount: 80.00, type: 'Debit', description: 'Lunch payment', date: '2025-12-10', time: '12:45 PM' },
    { id: 'TXN003', studentId: 'ECE2024003', studentName: 'Amit Kumar', amount: 40.00, type: 'Debit', description: 'Breakfast payment', date: '2025-12-10', time: '08:30 AM' },
    { id: 'TXN004', studentId: 'CSE2024004', studentName: 'Sneha Reddy', amount: 1000.00, type: 'Credit', description: 'Mess recharge', date: '2025-12-09', time: '03:20 PM' },
    { id: 'TXN005', studentId: 'ME2024005', studentName: 'Vikram Singh', amount: 50.00, type: 'Debit', description: 'Fine - Late payment', date: '2025-12-09', time: '11:00 AM' },
    { id: 'TXN006', studentId: 'CSE2024006', studentName: 'Ananya Gupta', amount: 80.00, type: 'Debit', description: 'Dinner payment', date: '2025-12-09', time: '07:30 PM' },
    { id: 'TXN007', studentId: 'ECE2024007', studentName: 'Karthik Nair', amount: 200.00, type: 'Credit', description: 'Refund - Event cancelled', date: '2025-12-08', time: '04:15 PM' },
    { id: 'TXN008', studentId: 'IT2024008', studentName: 'Meera Joshi', amount: 20.00, type: 'Debit', description: 'Snacks payment', date: '2025-12-08', time: '04:45 PM' },
    { id: 'TXN009', studentId: 'CSE2024009', studentName: 'Arjun Menon', amount: 750.00, type: 'Credit', description: 'Mess recharge', date: '2025-12-08', time: '09:00 AM' },
    { id: 'TXN010', studentId: 'CE2024010', studentName: 'Divya Krishnan', amount: 80.00, type: 'Debit', description: 'Lunch payment', date: '2025-12-07', time: '01:00 PM' },
    { id: 'TXN011', studentId: 'CSE2024011', studentName: 'Rohan Verma', amount: 160.00, type: 'Debit', description: 'Lunch + Dinner', date: '2025-12-07', time: '08:00 PM' },
    { id: 'TXN012', studentId: 'ECE2024012', studentName: 'Kavitha Rajan', amount: 500.00, type: 'Credit', description: 'Coin redemption', date: '2025-12-07', time: '02:30 PM' },
    { id: 'TXN013', studentId: 'ME2024013', studentName: 'Sanjay Das', amount: 40.00, type: 'Debit', description: 'Breakfast payment', date: '2025-12-06', time: '08:15 AM' },
    { id: 'TXN014', studentId: 'IT2024014', studentName: 'Nisha Agarwal', amount: 300.00, type: 'Credit', description: 'Mess recharge', date: '2025-12-06', time: '11:30 AM' },
    { id: 'TXN015', studentId: 'CSE2024015', studentName: 'Aditya Rao', amount: 100.00, type: 'Debit', description: 'Special dinner event', date: '2025-12-06', time: '07:00 PM' },
];

// System Settings - Default Values
export const DEFAULT_SYSTEM_SETTINGS = {
    messTimings: {
        breakfast: { start: '07:30', end: '09:30', label: 'Breakfast' },
        lunch: { start: '12:00', end: '14:30', label: 'Lunch' },
        snacks: { start: '16:00', end: '18:00', label: 'Snacks/Evening' },
        dinner: { start: '19:00', end: '21:30', label: 'Dinner' },
    },
    mealPrices: {
        breakfast: 40,
        lunch: 80,
        snacks: 20,
        dinner: 80,
    },
    dailySpendingLimit: 500,
    creditPolicies: {
        minRecharge: 100,
        maxRecharge: 5000,
        lowBalanceWarning: 100,
    },
    attendanceGracePeriod: 15, // minutes
    coinsPerAttendance: 10,
    coinToRupeeRate: 1.0,
    minRedemptionCoins: 50,
};

// Demo User Credentials (for documentation purposes)
export const DEMO_CREDENTIALS = {
    faculty: [
        { username: 'faculty1', email: 'faculty1@example.com', password: 'faculty123', name: 'Dr. Anil Kumar' },
        { username: 'faculty2', email: 'faculty2@example.com', password: 'faculty123', name: 'Prof. Meera Shah' },
        { username: 'faculty3', email: 'faculty3@example.com', password: 'faculty123', name: 'Prof. Suresh Iyer' },
    ],
    mess: [
        { username: 'mess1', email: 'mess1@example.com', password: 'mess123', name: 'Ravi (Main Hall)' },
        { username: 'mess2', email: 'mess2@example.com', password: 'mess123', name: 'Sunita (Annex)' },
    ],
    admin: [
        { username: 'admin', email: 'admin@example.com', password: 'admin123', name: 'System Administrator' },
        { username: 'admin1', email: 'admin1@example.com', password: 'admin123', name: 'Campus Admin' },
    ],
};

// Meal Intervals with menu items for MessTerminal UI
export const MEAL_INTERVALS = [
    {
        type: 'breakfast',
        label: 'Breakfast',
        timeRange: '7:30 AM - 9:30 AM',
        icon: '🌅',
        color: 'from-yellow-400 to-orange-500',
        price: 40,
        menuItems: ['Idli/Dosa', 'Poha/Upma', 'Bread & Butter', 'Tea/Coffee', 'Fruits'],
    },
    {
        type: 'lunch',
        label: 'Lunch',
        timeRange: '12:00 PM - 2:30 PM',
        icon: '🍛',
        color: 'from-green-400 to-emerald-500',
        price: 80,
        menuItems: ['Rice', 'Roti/Chapati', 'Dal', 'Vegetable Curry', 'Salad', 'Curd'],
    },
    {
        type: 'snacks',
        label: 'Snacks',
        timeRange: '4:00 PM - 6:00 PM',
        icon: '☕',
        color: 'from-pink-400 to-rose-500',
        price: 20,
        menuItems: ['Tea/Coffee', 'Biscuits', 'Samosa/Pakora', 'Sandwich'],
    },
    {
        type: 'dinner',
        label: 'Dinner',
        timeRange: '7:00 PM - 9:30 PM',
        icon: '🌙',
        color: 'from-blue-400 to-indigo-500',
        price: 80,
        menuItems: ['Rice', 'Roti/Chapati', 'Dal', 'Paneer/Egg Curry', 'Sweet', 'Salad'],
    },
];

export default {
    DEMO_STUDENTS,
    DEMO_ATTENDANCE_RECORDS,
    DEMO_TRANSACTIONS,
    DEFAULT_SYSTEM_SETTINGS,
    DEMO_CREDENTIALS,
    MEAL_INTERVALS,
};
