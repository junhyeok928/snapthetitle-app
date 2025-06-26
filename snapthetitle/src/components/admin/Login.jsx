// src/components/admin/Login.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError]     = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate  = useNavigate();
    const location  = useLocation();
    const from      = location.state?.from?.pathname || '/admin/dashboard';

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const success = await login({ username, password });
        setLoading(false);
        if (success) {
            navigate(from, { replace: true });
        } else {
            setError('로그인 실패: 아이디/비밀번호를 확인하세요.');
        }
    };

    return (
        <div className="max-w-sm mx-auto mt-20 p-6 bg-white shadow rounded">
            <h2 className="text-xl mb-4 text-center">관리자 로그인</h2>
            {error && <div className="mb-4 text-red-600 text-sm text-center">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="아이디"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="w-full p-2 border rounded"
                    disabled={loading}
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full p-2 border rounded"
                    disabled={loading}
                />
                <button
                    type="submit"
                    className={`w-full py-2 rounded text-white ${
                        loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                    disabled={loading}
                >
                    {loading ? '로딩중...' : '로그인'}
                </button>
            </form>
        </div>
    );
}
