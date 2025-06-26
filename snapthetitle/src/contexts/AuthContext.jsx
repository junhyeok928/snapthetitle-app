// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { loginAdmin } from 'api/adminApi';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [initialized, setInitialized] = useState(false);  // ← 추가

    useEffect(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        const role = localStorage.getItem('role');

        if (token && username && role) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser({ username, role });
        }
        setInitialized(true);  // ← 복원 시도 후에 true로
    }, []);

    const login = async ({ username, password }) => {
        try {
            const { token, role } = await loginAdmin({ username, password });
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            localStorage.setItem('role', role);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser({ username, role });
            return true;
        } catch {
            return false;
        }
    };

    const logout = () => {
        localStorage.clear();
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    };

    // 복원 완료 전까지는 자식 컴포넌트 렌더 금지 (스피너를 넣어도 좋습니다)
    if (!initialized) {
        return null;
    }

    return (
        <AuthContext.Provider value={{ user, initialized, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
