import React, { useState } from 'react';
import {
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from 'api/adminApi';
import { useSafeAsyncEffect } from 'hooks/useSafeAsyncEffect ';

export default function ProductManagement() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({
        year: new Date().getFullYear(),
        name: '',
        price: '',
        description: '',
        imageUrl: '',
        displayOrder: 0,
        options: [{ label: '', value: '', displayOrder: 0 }]
    });

    const load = async year => {
        setLoading(true);
        try {
            const data = await fetchProducts(year);
            const normalized = data.map(p => ({
                ...p,
                displayOrder: p.displayOrder ?? p.display_order ?? 0,
                options: p.options || []
            }));
            setProducts(normalized);
        } finally {
            setLoading(false);
        }
    };

    // ✅ useEffect → useSafeAsyncEffect
    useSafeAsyncEffect(() => load(form.year), []);

    const resetForm = () => {
        setEditingId(null);
        setForm({
            year: new Date().getFullYear(),
            name: '',
            price: '',
            description: '',
            imageUrl: '',
            displayOrder: 0,
            options: [{ label: '', value: '', displayOrder: 0 }]
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingId) await updateProduct(editingId, form);
            else await createProduct(form);
            await load(form.year);
            resetForm();
        } catch {
            alert('저장에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = prod => {
        setEditingId(prod.id);
        setForm({
            year: prod.year,
            name: prod.name,
            price: prod.price,
            description: prod.description || '',
            imageUrl: prod.imageUrl || '',
            displayOrder: prod.displayOrder,
            options: prod.options.length ? prod.options : [{ label: '', value: '', displayOrder: 0 }]
        });
    };

    const handleDelete = async id => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;
        setLoading(true);
        try {
            await deleteProduct(id);
            await load(form.year);
        } catch {
            alert('삭제에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleYearChange = e => {
        const year = parseInt(e.target.value, 10) || new Date().getFullYear();
        setForm(f => ({ ...f, year }));
        load(year);
    };

    const updateOption = (idx, key, val) => {
        const opts = [...form.options];
        opts[idx][key] = key === 'displayOrder' ? parseInt(val, 10) : val;
        setForm(f => ({ ...f, options: opts }));
    };
    const addOption = () =>
        setForm(f => ({ ...f, options: [...f.options, { label: '', value: '', displayOrder: 0 }] }));
    const removeOption = idx =>
        setForm(f => ({ ...f, options: f.options.filter((_, i) => i !== idx) }));

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">상품 관리</h1>

            {/* 연도 선택 */}
            <div className="flex items-center space-x-4">
                <label className="font-medium">연도:</label>
                <input
                    type="number"
                    value={form.year}
                    onChange={handleYearChange}
                    className="w-24 p-2 border rounded"
                />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="상품명"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="가격"
                        value={form.price}
                        onChange={e => setForm({ ...form, price: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="이미지 URL"
                        value={form.imageUrl}
                        onChange={e => setForm({ ...form, imageUrl: e.target.value })}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="number"
                        placeholder="순서"
                        value={form.displayOrder}
                        onChange={e => setForm({ ...form, displayOrder: parseInt(e.target.value, 10) })}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <textarea
                    placeholder="설명"
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    className="w-full p-2 border rounded h-24"
                />

                {/* Options */}
                <div>
                    <h2 className="font-medium mb-2">옵션 설정</h2>
                    {form.options.map((opt, idx) => (
                        <div key={idx} className="flex space-x-2 mb-2">
                            <input
                                type="text"
                                placeholder="옵션명"
                                value={opt.label}
                                onChange={e => updateOption(idx, 'label', e.target.value)}
                                className="p-2 border rounded flex-1"
                            />
                            <input
                                type="text"
                                placeholder="옵션값"
                                value={opt.value}
                                onChange={e => updateOption(idx, 'value', e.target.value)}
                                className="p-2 border rounded flex-1"
                            />
                            <input
                                type="number"
                                placeholder="정렬"
                                value={opt.displayOrder}
                                onChange={e => updateOption(idx, 'displayOrder', e.target.value)}
                                className="p-2 border rounded w-20"
                            />
                            <button
                                type="button"
                                onClick={() => removeOption(idx)}
                                className="px-2 bg-red-400 rounded text-white"
                            >삭제</button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addOption}
                        className="px-4 py-2 bg-green-400 rounded text-white"
                    >옵션 추가</button>
                </div>

                <div className="flex space-x-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >{editingId ? '수정' : '추가'}</button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="px-4 py-2 bg-gray-300 rounded"
                        >취소</button>
                    )}
                </div>
            </form>

            {/* List */}
            {loading ? (
                <p className="text-center py-10 text-gray-500">로딩 중...</p>
            ) : (
                <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 table-auto">
                        <thead className="bg-gray-100">
                        <tr>
                            {['ID', '연도', '상품명', '설명', '가격', '순서', '옵션 수', '조작'].map((title, i) => (
                                <th key={i} className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                    {title}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {products.map((prod, idx) => (
                            <tr
                                key={prod.id}
                                className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition-colors`}
                            >
                                <td className="px-4 py-3 text-sm text-gray-600">{prod.id}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{prod.year}</td>
                                <td className="px-4 py-3 text-sm text-gray-800 font-medium">{prod.name}</td>
                                <td className="px-4 py-3 text-sm text-gray-600 max-w-lg truncate">{prod.description}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{prod.price}원</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{prod.displayOrder}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{prod.options.length}</td>
                                <td className="px-4 py-3 text-sm space-x-2">
                                    <button
                                        onClick={() => handleEdit(prod)}
                                        className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500 transition"
                                    >수정</button>
                                    <button
                                        onClick={() => handleDelete(prod.id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                    >삭제</button>
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
