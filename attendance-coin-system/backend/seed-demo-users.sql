-- Seed Demo Users
-- Password for all demo users is: admin123
-- Hash: $2b$10$rKvVPZhJZqGdQxKJxKxKxOxKxKxKxKxKxKxKxKxKxKxKxKxKxKxKx

INSERT OR IGNORE INTO users (username, email, password_hash, full_name, role) VALUES
    ('faculty_demo', 'faculty@demo.com', '$2b$10$rKvVPZhJZqGdQxKJxKxKxOxKxKxKxKxKxKxKxKxKxKxKxKxKxKxKx', 'Dr. Faculty Demo', 'faculty'),
    ('mess_demo', 'mess@demo.com', '$2b$10$rKvVPZhJZqGdQxKJxKxKxOxKxKxKxKxKxKxKxKxKxKxKxKxKxKxKx', 'Mess Manager Demo', 'mess_staff'),
    ('student_demo', 'student@demo.com', '$2b$10$rKvVPZhJZqGdQxKJxKxKxOxKxKxKxKxKxKxKxKxKxKxKxKxKxKxKx', 'Student Demo', 'student'),
    ('student_demo2', 'student2@demo.com', '$2b$10$rKvVPZhJZqGdQxKJxKxKxOxKxKxKxKxKxKxKxKxKxKxKxKxKxKxKx', 'Student Two', 'student');

-- Initialize Wallets for new students
INSERT OR IGNORE INTO wallets (user_id, coin_balance, mess_balance)
SELECT id, 100, 500.00 FROM users WHERE username LIKE 'student_demo%';
