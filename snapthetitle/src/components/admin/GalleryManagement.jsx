import React, { useState, useRef } from 'react';
import {
    fetchGalleryPhotos,
    createGalleryPhotoWithFiles,
    deleteGalleryPhoto,
    updateGalleryPhotoWithFiles,
    updateGalleryPhotoOrder,
} from 'api/adminApi';
import { useSafeAsyncEffect } from 'hooks/useSafeAsyncEffect ';

import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToParentElement } from '@dnd-kit/modifiers';

const categories = ['바다', '들판', '스튜디오', '기타'];

function SortableRow({ photo, onEdit, onDelete }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: photo.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        backgroundColor: isDragging ? '#f0f9ff' : undefined,
    };

    const thumb = photo.attachments.find(att => att.isThumbnail);
    const original = photo.attachments.find(att => !att.isThumbnail);

    return (
        <tr
            ref={setNodeRef}
            style={style}
            className="hover:bg-gray-50 even:bg-white odd:bg-gray-50 transition-colors"
        >
            <td className="px-4 py-3 text-sm text-gray-600">{photo.displayOrder ?? '-'}</td>
            <td className="px-4 py-3 text-sm text-gray-600">{photo.category}</td>
            <td className="px-4 py-3">
                <img
                    src={thumb?.fileUrl || original?.fileUrl}
                    alt="thumb"
                    className="h-16 object-contain rounded"
                />
            </td>
            <td className="px-4 py-3 text-sm max-w-xs">
                <div className="flex flex-col gap-1">
                    {photo.attachments.map((att, idx) => (
                        <a
                            key={idx}
                            href={att.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-xs truncate"
                        >
                            {att.fileUrl}
                        </a>
                    ))}
                </div>
            </td>
            <td className="px-4 py-3 text-sm space-x-2 whitespace-nowrap">
                <div
                    {...listeners}
                    {...attributes}
                    className="cursor-move inline-block p-1 mr-2 text-gray-400 hover:text-gray-700"
                    title="드래그하여 순서 변경"
                >
                    &#9776;
                </div>
                <button
                    onClick={() => onEdit(photo)}
                    className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
                >
                    수정
                </button>
                <button
                    onClick={() => onDelete(photo.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    삭제
                </button>
            </td>
        </tr>
    );
}

export default function GalleryManagement() {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });
    const [editingId, setEditingId] = useState(null);
    const [category, setCategory] = useState('바다');
    const [selectedCategory, setSelectedCategory] = useState('바다');
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const fileInputRef = useRef(null);

    const filteredPhotos = photos
        .filter(photo => photo.category === selectedCategory)
        .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

    const loadPhotos = async () => {
        setLoading(true);
        try {
            const data = await fetchGalleryPhotos();
            setPhotos(data);
        } finally {
            setLoading(false);
        }
    };

    useSafeAsyncEffect(loadPhotos, []);

    const resetForm = () => {
        setEditingId(null);
        setCategory('바다');
        setSelectedCategory('바다');
        setFiles([]);
        setPreviews([]);
        setUploadProgress({ current: 0, total: 0 });
        if (fileInputRef.current) fileInputRef.current.value = null;
    };

    const handleFileChange = e => {
        const selected = Array.from(e.target.files);
        const oversized = selected.find(file => file.size > 100 * 1024 * 1024);
        if (oversized) {
            alert("100MB 이하의 파일만 업로드할 수 있습니다.");
            return;
        }

        const newPreviews = selected.map(file => URL.createObjectURL(file));

        if (editingId) {
            setPreviews(newPreviews);
            setFiles(selected);
        } else {
            setPreviews(prev => [...prev, ...newPreviews]);
            setFiles(prev => [...prev, ...selected]);
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();

        if (!editingId && files.length === 0) {
            alert('이미지를 하나 이상 선택해주세요.');
            return;
        }

        setUploading(true);
        setUploadProgress({ current: 0, total: files.length });

        try {
            if (editingId) {
                for (let i = 0; i < files.length; i++) {
                    await updateGalleryPhotoWithFiles(editingId, { category }, [files[i]]);
                    setUploadProgress({ current: i + 1, total: files.length });
                }
            } else {
                for (let i = 0; i < files.length; i++) {
                    await createGalleryPhotoWithFiles({ category }, [files[i]]);
                    setUploadProgress({ current: i + 1, total: files.length });
                }
            }
            await loadPhotos();
            resetForm();
        } catch (error) {
            console.error(error);
            alert('업로드 중 오류가 발생했습니다.');
        } finally {
            setUploading(false);
        }
    };

    const handleEdit = photo => {
        setEditingId(photo.id);
        setCategory(photo.category);
        setSelectedCategory(photo.category);
        setFiles([]);
        const existingPreviews = photo.attachments.map(att => `${process.env.REACT_APP_API_URL}${att.fileUrl}`);
        setPreviews(existingPreviews);
        if (fileInputRef.current) fileInputRef.current.value = null;
    };

    const handleDelete = async id => {
        if (!window.confirm('삭제하시겠습니까?')) return;
        setLoading(true);
        try {
            await deleteGalleryPhoto(id);
            await loadPhotos();
        } finally {
            setLoading(false);
        }
    };

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = event => {
        const { active, over } = event;
        if (!over) return;
        if (active.id !== over.id) {
            const oldIndex = filteredPhotos.findIndex(p => p.id === active.id);
            const newIndex = filteredPhotos.findIndex(p => p.id === over.id);
            let newFiltered = arrayMove(filteredPhotos, oldIndex, newIndex);
            newFiltered = newFiltered.map((photo, idx) => ({
                ...photo,
                displayOrder: idx + 1,
            }));
            const newPhotos = [...photos];
            let fi = 0;
            for (let i = 0; i < newPhotos.length; i++) {
                if (newPhotos[i].category === selectedCategory) {
                    newPhotos[i] = newFiltered[fi];
                    fi++;
                }
            }
            setPhotos(newPhotos);
        }
    };

    const handleSaveOrder = async () => {
        try {
            const orderList = filteredPhotos.map((photo, idx) => ({
                id: photo.id,
                displayOrder: idx + 1,
            }));
            await updateGalleryPhotoOrder(orderList);
            alert('정렬 순서가 저장되었습니다.');
            await loadPhotos();
        } catch (error) {
            console.error(error);
            alert('순서 저장 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">갤러리 관리</h1>

            <div className="flex space-x-4 mb-6">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`px-4 py-2 rounded ${selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                        onClick={() => {
                            setSelectedCategory(cat);
                            setCategory(cat);
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
                <div className="space-y-4">
                    <select
                        value={selectedCategory}
                        onChange={e => {
                            setSelectedCategory(e.target.value);
                            setCategory(e.target.value);
                        }}
                        className="w-48 p-2 border rounded"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>

                    <div
                        className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:bg-gray-50 transition"
                        onClick={() => fileInputRef.current?.click()}
                        onDrop={(e) => {
                            e.preventDefault();
                            const dt = e.dataTransfer;
                            const event = { target: { files: dt.files } };
                            handleFileChange(event);
                        }}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <p className="text-gray-600 mb-2">
                            <strong className="text-blue-600">클릭</strong>하거나 <strong className="text-blue-600">파일을 드래그</strong>하여 업로드하세요
                        </p>
                        <p className="text-sm text-gray-400">(최대 100MB, 다중 선택 가능)</p>
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={uploading}
                    />

                    {previews.length > 0 && (
                        <div className="flex flex-wrap gap-4 mt-4">
                            {previews.map((url, idx) => (
                                <img
                                    key={idx}
                                    src={url}
                                    alt={`preview-${idx}`}
                                    className="w-28 h-28 object-cover rounded-lg border"
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex space-x-4">
                    <button
                        type="submit"
                        disabled={uploading || loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {editingId ? '수정' : '추가'}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={resetForm}
                            disabled={uploading}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                        >
                            취소
                        </button>
                    )}
                </div>
            </form>

            {uploading && (
                <div className="mt-4 text-center text-sm text-gray-600">
                    업로드 중... {uploadProgress.current} / {uploadProgress.total}
                </div>
            )}

            <div className="flex justify-end">
                <button
                    onClick={handleSaveOrder}
                    disabled={loading || uploading}
                    className="mt-2 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                >
                    순서 저장
                </button>
            </div>

            {loading ? (
                <p className="text-center py-10 text-gray-500">로딩 중...</p>
            ) : (
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                    modifiers={[restrictToParentElement]}
                >
                    <SortableContext
                        items={filteredPhotos.map(photo => photo.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className="overflow-x-auto bg-white rounded-xl shadow">
                            <table className="min-w-full divide-y divide-gray-200 table-auto">
                                <thead className="bg-gray-100">
                                <tr>
                                    {['순서', '카테고리', '미리보기', 'URL', '조작'].map((h, idx) => (
                                        <th
                                            key={idx}
                                            className="px-4 py-2 text-left text-sm font-medium text-gray-700"
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {filteredPhotos.map(photo => (
                                    <SortableRow
                                        key={photo.id}
                                        photo={photo}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    />
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </SortableContext>
                </DndContext>
            )}
        </div>
    );
}
