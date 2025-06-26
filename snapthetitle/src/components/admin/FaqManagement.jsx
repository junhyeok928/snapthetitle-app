import React, { useState } from 'react';
import {
    fetchFaqs,
    createFaq,
    updateFaq,
    deleteFaq
} from 'api/adminApi';
import { useSafeAsyncEffect } from 'hooks/useSafeAsyncEffect ';

export default function FaqManagement() {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({ category: '', question: '', answer: '' });

    const loadFaqs = async () => {
        setLoading(true);
        try {
            const data = await fetchFaqs();
            setFaqs(data);
        } finally {
            setLoading(false);
        }
    };

    // ✅ useSafeAsyncEffect로 대체
    useSafeAsyncEffect(loadFaqs, []);

    const resetForm = () => {
        setEditingId(null);
        setForm({ category: '', question: '', answer: '' });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingId) {
                await updateFaq(editingId, form);
            } else {
                await createFaq(form);
            }
            await loadFaqs();
            resetForm();
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = faq => {
        setEditingId(faq.id);
        setForm({ category: faq.category, question: faq.question, answer: faq.answer });
    };

    const handleDelete = async id => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;
        setLoading(true);
        try {
            await deleteFaq(id);
            await loadFaqs();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">FAQ 관리</h1>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="카테고리"
                        value={form.category}
                        onChange={e => setForm({ ...form, category: e.target.value })}
                        className="p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="질문"
                        value={form.question}
                        onChange={e => setForm({ ...form, question: e.target.value })}
                        className="p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="답변"
                        value={form.answer}
                        onChange={e => setForm({ ...form, answer: e.target.value })}
                        className="p-2 border rounded"
                        required
                    />
                </div>
                <div className="flex space-x-4">
                    <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        {editingId ? '수정' : '추가'}
                    </button>
                    {editingId && (
                        <button type="button" onClick={resetForm} className="px-4 py-2 bg-gray-300 rounded">
                            취소
                        </button>
                    )}
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
                            {['ID', '카테고리', '질문', '답변', '조작'].map((header, idx) => (
                                <th key={idx} className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                    {header}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {faqs.map(faq => (
                            <tr key={faq.id} className="hover:bg-gray-50 even:bg-white odd:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 text-sm text-gray-600">{faq.id}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{faq.category}</td>
                                <td className="px-4 py-3 text-sm text-gray-800">{faq.question}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{faq.answer}</td>
                                <td className="px-4 py-3 text-sm space-x-2">
                                    <button onClick={() => handleEdit(faq)} className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500 transition">
                                        수정
                                    </button>
                                    <button onClick={() => handleDelete(faq.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
                                        삭제
                                    </button>
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
