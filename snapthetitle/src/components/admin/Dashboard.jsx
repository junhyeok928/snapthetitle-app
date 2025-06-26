import React, { useState } from 'react';
import {useSafeAsyncEffect} from 'hooks/useSafeAsyncEffect ';
import {fetchDashboardCharts, fetchDashboardStats} from 'api/adminApi';
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';

export default function Dashboard() {
    const [stats, setStats] = useState({
        todayVisitCount: 0,
        weeklyVisitCount: 0,
        galleryCount: 0,
        productCount: 0,
        faqCount: 0,
        guideCount: 0,
        partnerCount: 0,
    });
    const [chartData, setChartData] = useState({ dailyVisitors: [], refererStats: [] });

    useSafeAsyncEffect(async () => {
        const data = await fetchDashboardStats();
        setStats(data);
    }, []);

    useSafeAsyncEffect(async () => {
        const chartData = await fetchDashboardCharts();
        setChartData(chartData);
    }, []);

    const topCards = [
        { label: '오늘 방문자',     value: stats.todayVisitCount,   bg: 'bg-sky-100',   icon: '👤' },
        { label: '최근 7일 방문자', value: stats.weeklyVisitCount, bg: 'bg-sky-200',   icon: '📊' },
    ];

    const bottomCards = [
        { label: '갤러리 항목',     value: stats.galleryCount,      bg: 'bg-blue-100',  icon: '🖼️' },
        { label: '상품 수',         value: stats.productCount,      bg: 'bg-green-100', icon: '📦' },
        { label: 'FAQ 수',          value: stats.faqCount,          bg: 'bg-yellow-100',icon: '❓' },
        { label: '가이드 수',       value: stats.guideCount,        bg: 'bg-purple-100',icon: '📖' },
        { label: '파트너 수',       value: stats.partnerCount,      bg: 'bg-red-100',   icon: '🤝' },
    ];

    const colors = ['#60a5fa', '#a78bfa', '#34d399', '#fbbf24', '#f87171'];
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-semibold">관리자 대시보드</h1>

            {/* 상단 방문자 카드 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {topCards.map((card) => (
                    <div
                        key={card.label}
                        className={`${card.bg} rounded-xl p-6 flex items-center space-x-4 shadow`}
                    >
                        <div className="text-4xl">{card.icon}</div>
                        <div>
                            <p className="text-2xl font-bold">{card.value}</p>
                            <p className="text-gray-700">{card.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* 하단 기타 통계 카드 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 mt-10">
                {bottomCards.map((card) => (
                    <div
                        key={card.label}
                        className={`${card.bg} rounded-xl p-6 flex items-center space-x-4 shadow`}
                    >
                        <div className="text-4xl">{card.icon}</div>
                        <div>
                            <p className="text-2xl font-bold">{card.value}</p>
                            <p className="text-gray-700">{card.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* 그래프 영역 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
                {/* 꺾은선 그래프 */}
                <section className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-xl font-medium mb-4">최근 7일 방문자 수</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={chartData.dailyVisitors}>
                            <XAxis dataKey="label" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Line type="monotone" dataKey="count" stroke="#1e40af" />
                        </LineChart>
                    </ResponsiveContainer>
                </section>

                {/* 유입 경로 PieChart */}
                <section className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-xl font-medium mb-4">유입 경로 비율</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={chartData.refererStats}
                                dataKey="count"
                                nameKey="label"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label
                            >
                                {chartData.refererStats.map((_, index) => (
                                    <Cell key={index} fill={colors[index % colors.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </section>
            </div>

        </div>
    );
}
