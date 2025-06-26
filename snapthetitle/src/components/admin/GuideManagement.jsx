import React, { useState } from 'react';
import {
    fetchGuides,
    createGuide,
    updateGuide,
    deleteGuide
} from 'api/adminApi';
import { useSafeAsyncEffect } from 'hooks/useSafeAsyncEffect ';

export default function GuideManagement() {
    const [guides, setGuides] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({
        category: '',
        content: '',
        linkText: '',
        linkUrl: '',
        displayOrder: 1,
        details: [{ subtitle: '', description: '', displayOrder: 1 }]
    });

    const loadGuides = async () => {
        setLoading(true);
        try {
            setGuides(await fetchGuides());
        } finally {
            setLoading(false);
        }
    };

    // ✅ useSafeAsyncEffect로 공통 401 처리
    useSafeAsyncEffect(loadGuides, []);

    const resetForm = () => {
        setEditingId(null);
        setForm({
            category: '', content: '', linkText: '', linkUrl: '', displayOrder: 1,
            details: [{ subtitle: '', description: '', displayOrder: 1 }]
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingId) await updateGuide(editingId, form);
            else await createGuide(form);
            await loadGuides();
            resetForm();
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = guide => {
        setEditingId(guide.id);
        setForm({
            category: guide.category,
            content: guide.content,
            linkText: guide.linkText || '',
            linkUrl: guide.linkUrl || '',
            displayOrder: guide.displayOrder,
            details: guide.details.length ? guide.details : [{ subtitle: '', description: '', displayOrder: 1 }]
        });
    };

    const handleDelete = async id => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;
        setLoading(true);
        try {
            await deleteGuide(id);
            await loadGuides();
        } finally {
            setLoading(false);
        }
    };

    const updateDetail = (idx, key, val) => {
        const det = [...form.details];
        det[idx][key] = key === 'displayOrder' ? parseInt(val, 10) : val;
        setForm(f => ({ ...f, details: det }));
    };
    const addDetail = () =>
        setForm(f => ({ ...f, details: [...f.details, { subtitle: '', description: '', displayOrder: 1 }] }));
    const removeDetail = idx =>
        setForm(f => ({ ...f, details: f.details.filter((_, i) => i !== idx) }));

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">가이드 관리</h1>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                        type="text" placeholder="카테고리" value={form.category}
                        onChange={e => setForm({ ...form, category: e.target.value })}
                        className="p-2 border rounded" required
                    />
                    <input
                        type="number" placeholder="순서" min={1} value={form.displayOrder}
                        onChange={e => setForm({ ...form, displayOrder: Math.max(1, parseInt(e.target.value, 10)) })}
                        className="p-2 border rounded" required
                    />
                    <input
                        type="text" placeholder="링크 텍스트" value={form.linkText}
                        onChange={e => setForm({ ...form, linkText: e.target.value })}
                        className="p-2 border rounded"
                    />
                    <input
                        type="text" placeholder="링크 URL" value={form.linkUrl}
                        onChange={e => setForm({ ...form, linkUrl: e.target.value })}
                        className="p-2 border rounded"
                    />
                </div>
                <textarea
                    placeholder="본문 내용" value={form.content}
                    onChange={e => setForm({ ...form, content: e.target.value })}
                    className="w-full p-2 border rounded h-24" required
                />

                {/* Details */}
                <div>
                    <h2 className="font-medium mb-2">상세 항목</h2>
                    {form.details.map((d, idx) => (
                        <div key={idx} className="flex space-x-2 mb-2">
                            <input type="text" placeholder="소제목" value={d.subtitle}
                                   onChange={e => updateDetail(idx, 'subtitle', e.target.value)}
                                   className="p-2 border rounded flex-1" />
                            <input type="text" placeholder="설명" value={d.description}
                                   onChange={e => updateDetail(idx, 'description', e.target.value)}
                                   className="p-2 border rounded flex-1" />
                            <input type="number" placeholder="순서" min={1} value={d.displayOrder}
                                   onChange={e => updateDetail(idx, 'displayOrder', e.target.value)}
                                   className="p-2 border rounded w-20" />
                            <button type="button" onClick={() => removeDetail(idx)}
                                    className="px-2 bg-red-400 text-white rounded">
                                삭제
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addDetail}
                            className="px-4 py-2 bg-green-400 text-white rounded">
                        상세 항목 추가
                    </button>
                </div>

                <div className="flex space-x-4">
                    <button type="submit" disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        {editingId ? '수정' : '추가'}
                    </button>
                    {editingId && <button type="button" onClick={resetForm}
                                          className="px-4 py-2 bg-gray-300 rounded">취소</button>}
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
                            {['ID', '카테고리', '순서', '내용', '링크', '상세 개수', '조작'].map((h, i) => (
                                <th key={i} className="px-4 py-2 text-left text-sm font-medium text-gray-700">{h}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {guides.map(g => (
                            <tr key={g.id} className="hover:bg-gray-50 even:bg-white odd:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 text-sm text-gray-600">{g.id}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{g.category}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{g.displayOrder}</td>
                                <td className="px-4 py-3 text-sm text-gray-800 truncate max-w-md">{g.content}</td>
                                <td className="px-4 py-3 text-sm text-blue-600 hover:underline">
                                    {g.linkUrl ? (
                                        <a href={g.linkUrl} target="_blank" rel="noopener noreferrer">
                                            {g.linkText || g.linkUrl}
                                        </a>
                                    ) : '-'}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-600">{g.details.length}</td>
                                <td className="px-4 py-3 text-sm space-x-2">
                                    <button onClick={() => handleEdit(g)} className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500">수정</button>
                                    <button onClick={() => handleDelete(g.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">삭제</button>
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
