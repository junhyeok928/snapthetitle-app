import React, { useState } from 'react';
import {
    fetchPartners,
    createPartner,
    updatePartner,
    deletePartner
} from 'api/adminApi';
import { useSafeAsyncEffect } from 'hooks/useSafeAsyncEffect ';

export default function PartnerManagement() {
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({ category: '', name: '', instagram: '', linkUrl: '', displayOrder: 1 });

    const loadPartners = async () => {
        setLoading(true);
        try {
            const data = await fetchPartners();
            setPartners(data);
        } finally {
            setLoading(false);
        }
    };

    // ✅ 401 공통 처리 커스텀 훅 사용
    useSafeAsyncEffect(loadPartners, []);

    const resetForm = () => {
        setEditingId(null);
        setForm({ category: '', name: '', instagram: '', linkUrl: '', displayOrder: 1 });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingId) await updatePartner(editingId, form);
            else await createPartner(form);
            await loadPartners();
            resetForm();
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = p => {
        setEditingId(p.id);
        setForm({
            category: p.category,
            name: p.name,
            instagram: p.instagram || '',
            linkUrl: p.linkUrl || '',
            displayOrder: p.displayOrder
        });
    };

    const handleDelete = async id => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;
        setLoading(true);
        try {
            await deletePartner(id);
            await loadPartners();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">파트너 관리</h1>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                        type="text" placeholder="카테고리" value={form.category}
                        onChange={e => setForm({ ...form, category: e.target.value })}
                        className="p-2 border rounded" required
                    />
                    <input
                        type="text" placeholder="이름" value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="p-2 border rounded" required
                    />
                    <input
                        type="text" placeholder="인스타그램" value={form.instagram}
                        onChange={e => setForm({ ...form, instagram: e.target.value })}
                        className="p-2 border rounded"
                    />
                    <input
                        type="text" placeholder="URL" value={form.linkUrl}
                        onChange={e => setForm({ ...form, linkUrl: e.target.value })}
                        className="p-2 border rounded"
                    />
                    <input
                        type="number" placeholder="순서" min={1} value={form.displayOrder}
                        onChange={e => setForm({ ...form, displayOrder: Math.max(1, parseInt(e.target.value, 10)) })}
                        className="p-2 border rounded" required
                    />
                </div>
                <div className="flex space-x-4">
                    <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        {editingId ? '수정' : '추가'}
                    </button>
                    {editingId && <button type="button" onClick={resetForm} className="px-4 py-2 bg-gray-300 rounded">취소</button>}
                </div>
            </form>

            {/* List */}
            {loading ? (
                <p className="text-center py-10 text-gray-500">로딩 중...</p>
            ) : (
                <div className="bg-white rounded-xl shadow overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 table-auto">
                        <thead className="bg-gray-100">
                        <tr>
                            {['ID', '카테고리', '이름', '인스타', 'URL', '순서', '조작'].map((h, i) => (
                                <th key={i} className="px-4 py-2 text-left text-sm font-medium text-gray-700">{h}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {partners.map(p => (
                            <tr key={p.id} className="hover:bg-gray-50 even:bg-white odd:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 text-sm text-gray-600">{p.id}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{p.category}</td>
                                <td className="px-4 py-3 text-sm text-gray-800">{p.name}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{p.instagram}</td>
                                <td className="px-4 py-3 text-sm text-blue-600 hover:underline truncate max-w-xs">
                                    {p.linkUrl ? (
                                        <a href={p.linkUrl} target="_blank" rel="noopener noreferrer">{p.linkUrl}</a>
                                    ) : '-'}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-600">{p.displayOrder}</td>
                                <td className="px-4 py-3 text-sm space-x-2">
                                    <button onClick={() => handleEdit(p)} className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500">수정</button>
                                    <button onClick={() => handleDelete(p.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">삭제</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
