// src/components/common/AdminLayout.jsx
import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

export default function AdminLayout() {
    const { logout } = useAuth();
    const navigate   = useNavigate();
    const menuItems  = [
        { to: 'dashboard', label: '대시보드' },
        { to: 'main',      label:'메인 관리'},
        { to: 'gallery',   label: '갤러리 관리' },
        { to: 'product',   label: '상품 관리' },
        { to: 'faq',       label: 'FAQ 관리' },
        { to: 'guide',     label: '가이드 관리' },
        { to: 'partner',   label: '파트너 관리' },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-gray-200 text-gray-800 shadow-sm py-3 px-6 flex items-center justify-between">
                <img src="/logo_01.png" alt="SnapTheTitle Admin" className="h-6" />
                <button
                    onClick={() => {
                        logout();
                        navigate('/admin/login');
                    }}
                    className="text-sm hover:underline"
                >
                    로그아웃
                </button>
            </header>

            <div className="flex flex-1">
                <aside className="w-64 bg-gray-100 p-6 space-y-2">
                    {menuItems.map(item => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `block py-2 px-4 rounded ${
                                    isActive ? 'bg-white shadow' : 'hover:bg-gray-200'
                                }`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </aside>

                <main className="flex-1 bg-gray-50 p-8 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
