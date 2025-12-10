import React, { useState } from 'react';
import { Calendar, Check, X, Clock, Save, Users, CheckSquare, XSquare, Download } from 'lucide-react';
import GlowButton from '../components/ui/GlowButton';
import toast from 'react-hot-toast';

const FacultyAttendance = () => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [students, setStudents] = useState([
        { id: 1, name: 'John Doe', rollNo: 'CS101', status: 'present', remark: '' },
        { id: 2, name: 'Jane Smith', rollNo: 'CS102', status: 'present', remark: '' },
        { id: 3, name: 'Mike Johnson', rollNo: 'CS103', status: 'absent', remark: '' },
        { id: 4, name: 'Sarah Williams', rollNo: 'CS104', status: 'present', remark: '' },
        { id: 5, name: 'Robert Brown', rollNo: 'CS105', status: 'late', remark: 'Medical appointment' },
    ]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [showRemarks, setShowRemarks] = useState({});

    const handleStatusChange = (id, newStatus) => {
        setStudents(students.map(student =>
            student.id === id ? { ...student, status: newStatus } : student
        ));
    };

    const handleRemarkChange = (id, remark) => {
        setStudents(students.map(student =>
            student.id === id ? { ...student, remark } : student
        ));
    };

    const toggleStudentSelection = (id) => {
        setSelectedStudents(prev =>
            prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
        );
    };

    const selectAll = () => {
        setSelectedStudents(students.map(s => s.id));
    };

    const deselectAll = () => {
        setSelectedStudents([]);
    };

    const bulkMarkStatus = (status) => {
        if (selectedStudents.length === 0) {
            toast.error('Please select students first');
            return;
        }

        setStudents(students.map(student =>
            selectedStudents.includes(student.id)
                ? { ...student, status }
                : student
        ));
        toast.success(`Marked ${selectedStudents.length} students as ${status}`);
        setSelectedStudents([]);
    };

    const handleExportCSV = () => {
        // Define CSV headers
        const headers = ['Date', 'Time', 'Student ID', 'Student Name', 'Status', 'Marked By', 'Method'];

        // Format data rows
        const rows = students.map(student => [
            date,
            new Date().toLocaleTimeString(), // Using current time for export
            student.rollNo,
            student.name,
            student.status,
            'Faculty User', // Placeholder for current user
            'Manual'
        ]);

        // Combine headers and rows
        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        // Create blob and download link
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', `attendance_log_${date}.csv`);
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success(`Exported attendance for ${date}`);
    };

    const handleSubmit = () => {
        console.log('Submitting attendance for:', date, students);
        toast.success('Attendance saved successfully!');
    };

    const stats = {
        present: students.filter(s => s.status === 'present').length,
        absent: students.filter(s => s.status === 'absent').length,
        late: students.filter(s => s.status === 'late').length,
        total: students.length,
    };

    const attendancePercentage = ((stats.present + stats.late) / stats.total * 100).toFixed(1);

    return (
        <div className="max-w-7xl mx-auto px-4 fade-in-up">
            {/* Header */}
            <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <p className="text-secondary-cyan font-medium mb-1 uppercase tracking-wider text-sm">Faculty Portal</p>
                    <h1 className="text-4xl font-bold text-text-light">Mark Attendance</h1>
                    <p className="text-text-muted-dark mt-2 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Computer Science - Section A
                    </p>
                </div>

                {/* Date Picker */}
                <div className="flex items-center gap-3 glass-card p-3 rounded-lg border border-glass-border shadow-glow-soft">
                    <div className="p-2 bg-primary-violet/20 rounded-lg">
                        <Calendar className="w-5 h-5 text-primary-violet" />
                    </div>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="bg-transparent outline-none text-text-light font-medium [&::-webkit-calendar-picker-indicator]:invert"
                    />
                </div>
            </header>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                <div className="glass-card p-4">
                    <div className="text-2xl font-bold text-text-light">{stats.total}</div>
                    <div className="text-xs text-text-muted-dark">Total Students</div>
                </div>
                <div className="glass-card p-4">
                    <div className="text-2xl font-bold text-green-400">{stats.present}</div>
                    <div className="text-xs text-text-muted-dark">Present</div>
                </div>
                <div className="glass-card p-4">
                    <div className="text-2xl font-bold text-red-400">{stats.absent}</div>
                    <div className="text-xs text-text-muted-dark">Absent</div>
                </div>
                <div className="glass-card p-4">
                    <div className="text-2xl font-bold text-yellow-400">{stats.late}</div>
                    <div className="text-xs text-text-muted-dark">Late</div>
                </div>
                <div className="glass-card p-4 border border-primary-violet">
                    <div className="text-2xl font-bold text-primary-violet">{attendancePercentage}%</div>
                    <div className="text-xs text-text-muted-dark">Attendance</div>
                </div>
            </div>

            {/* Bulk Actions */}
            {selectedStudents.length > 0 && (
                <div className="glass-card p-4 mb-6 flex items-center justify-between border border-primary-violet">
                    <span className="text-text-light font-semibold">
                        {selectedStudents.length} student{selectedStudents.length > 1 ? 's' : ''} selected
                    </span>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => bulkMarkStatus('present')}
                            className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 border border-green-500/50 hover:bg-green-500/30 transition-smooth text-sm font-medium"
                        >
                            <CheckSquare className="w-4 h-4 inline mr-1" />
                            Mark Present
                        </button>
                        <button
                            onClick={() => bulkMarkStatus('absent')}
                            className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30 transition-smooth text-sm font-medium"
                        >
                            <XSquare className="w-4 h-4 inline mr-1" />
                            Mark Absent
                        </button>
                        <button
                            onClick={deselectAll}
                            className="px-4 py-2 rounded-lg bg-white/5 text-text-light border border-glass-border hover:bg-white/10 transition-smooth text-sm font-medium"
                        >
                            Clear
                        </button>
                    </div>
                </div>
            )}

            {/* Attendance Table */}
            <div className="glass-card rounded-card-glass overflow-hidden shadow-glass">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-white/5 border-b border-glass-border">
                            <tr>
                                <th className="px-6 py-4 text-left w-12">
                                    <input
                                        type="checkbox"
                                        checked={selectedStudents.length === students.length}
                                        onChange={(e) => e.target.checked ? selectAll() : deselectAll()}
                                        className="w-4 h-4 rounded accent-primary-violet"
                                    />
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-text-muted-dark uppercase tracking-wider">
                                    Student Info
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-text-muted-dark uppercase tracking-wider">
                                    Roll No
                                </th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-text-muted-dark uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-text-muted-dark uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-glass-border">
                            {students.map((student) => (
                                <React.Fragment key={student.id}>
                                    <tr className={`hover:bg-white/5 transition-smooth ${selectedStudents.includes(student.id) ? 'bg-primary-violet/10' : ''}`}>
                                        <td className="px-6 py-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedStudents.includes(student.id)}
                                                onChange={() => toggleStudentSelection(student.id)}
                                                className="w-4 h-4 rounded accent-primary-violet"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-semibold text-text-light">{student.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-text-muted-dark font-mono text-sm">
                                            {student.rollNo}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className={`status-pill status-pill--${student.status}`}>
                                                <span className={`pulsing-dot ${student.status === 'present' ? 'bg-green-400' :
                                                    student.status === 'absent' ? 'bg-red-400' :
                                                        'bg-yellow-400'
                                                    }`}></span>
                                                {student.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleStatusChange(student.id, 'present')}
                                                    className={`p-2 rounded-lg transition-smooth ${student.status === 'present'
                                                        ? 'bg-green-500 text-white shadow-glow-soft'
                                                        : 'bg-white/5 text-text-muted-dark hover:bg-green-500/20 hover:text-green-400 border border-glass-border'
                                                        }`}
                                                    title="Mark Present"
                                                >
                                                    <Check className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleStatusChange(student.id, 'absent')}
                                                    className={`p-2 rounded-lg transition-smooth ${student.status === 'absent'
                                                        ? 'bg-red-500 text-white shadow-glow-soft'
                                                        : 'bg-white/5 text-text-muted-dark hover:bg-red-500/20 hover:text-red-400 border border-glass-border'
                                                        }`}
                                                    title="Mark Absent"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleStatusChange(student.id, 'late')}
                                                    className={`p-2 rounded-lg transition-smooth ${student.status === 'late'
                                                        ? 'bg-yellow-500 text-white shadow-glow-soft'
                                                        : 'bg-white/5 text-text-muted-dark hover:bg-yellow-500/20 hover:text-yellow-400 border border-glass-border'
                                                        }`}
                                                    title="Mark Late"
                                                >
                                                    <Clock className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => setShowRemarks(prev => ({ ...prev, [student.id]: !prev[student.id] }))}
                                                    className="p-2 rounded-lg bg-white/5 text-text-muted-dark hover:bg-primary-violet/20 hover:text-primary-violet border border-glass-border transition-smooth text-xs font-medium"
                                                    title="Add Remark"
                                                >
                                                    💬
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    {/* Remark Row */}
                                    {showRemarks[student.id] && (
                                        <tr className="bg-white/5">
                                            <td colSpan="5" className="px-6 py-3">
                                                <div className="flex items-center gap-3">
                                                    <label className="text-sm text-text-muted-dark">Remark:</label>
                                                    <input
                                                        type="text"
                                                        value={student.remark}
                                                        onChange={(e) => handleRemarkChange(student.id, e.target.value)}
                                                        placeholder="Optional remark (e.g., Medical appointment)"
                                                        className="flex-1 px-3 py-2 bg-white/5 border border-glass-border rounded-lg text-text-light text-sm focus:border-primary-violet focus:outline-none transition-smooth"
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="p-6 bg-white/5 border-t border-glass-border flex flex-col sm:flex-row justify-between items-center gap-4">
                    <button
                        onClick={handleExportCSV}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-text-light border border-glass-border hover:border-primary-violet hover:shadow-glow-soft transition-smooth"
                    >
                        <Download className="w-4 h-4" />
                        <span>Export CSV</span>
                    </button>
                    <GlowButton onClick={handleSubmit} className="gap-2">
                        <Save className="w-5 h-5" />
                        <span>Save Attendance</span>
                    </GlowButton>
                </div>
            </div>
        </div>
    );
};

export default FacultyAttendance;
