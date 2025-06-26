// src/components/common/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

export default function PrivateRoute({ children }) {
    const { user, initialized } = useAuth();

    // 1) 초기화가 안 끝났으면 로딩 중
    if (!initialized) {
        return null; // 또는 스피너 컴포넌트 <Loading /> 등을 렌더링
    }

    // 2) 초기화 끝났는데 user가 없으면 로그인으로 리다이렉트
    if (!user) {
        return <Navigate to="/admin/login" replace />;
    }

    // 3) user가 있으면 자식(관리자 레이아웃) 렌더
    return children;
}
