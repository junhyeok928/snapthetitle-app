import React, { useState, useRef } from 'react';
import {
    fetchMainPhotos,
    uploadMainPhoto,
    deleteMainPhoto,
    updateMainPhotoOrder,
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

function SortableRow({ photo, onDelete }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: photo.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        backgroundColor: isDragging ? '#f0f9ff' : undefined,
    };

    const image = photo.attachments?.find(att => !att.isThumbnail);
    const thumb = photo.attachments?.find(att => att.isThumbnail);

    return (
        <tr
            ref={setNodeRef}
            style={style}
            className="hover:bg-gray-50 even:bg-white odd:bg-gray-50 transition-colors"
        >
            <td className="px-4 py-3 text-sm text-gray-600">{photo.displayOrder ?? '-'}</td>
            <td className="px-4 py-3">
                <img
                    src={thumb?.fileUrl || image?.fileUrl}
                    alt="main"
                    className="h-16 object-contain rounded"
                />
            </td>
            <td className="px-4 py-3 text-sm max-w-xs">
                <a
                    href={image?.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-xs truncate"
                >
                    {image?.fileUrl}
                </a>
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
                    onClick={() => onDelete(photo.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    삭제
                </button>
            </td>
        </tr>
    );
}

export default function MainManagement() {
    const [photos, setPhotos] = useState([]);
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });
    const fileInputRef = useRef(null);

    const loadPhotos = async () => {
        const data = await fetchMainPhotos();
        setPhotos(data.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)));
    };

    // ✅ 401 대응 공통 커스텀 훅 적용
    useSafeAsyncEffect(loadPhotos, []);

    const handleFileChange = e => {
        const selected = Array.from(e.target.files);
        const oversized = selected.find(file => file.size > 100 * 1024 * 1024);
        if (oversized) {
            alert("100MB 이하의 파일만 업로드할 수 있습니다.");
            return;
        }
        const newPreviews = selected.map(file => URL.createObjectURL(file));
        setPreviews(newPreviews);
        setFiles(selected);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (files.length === 0) {
            alert('이미지를 하나 이상 선택해주세요.');
            return;
        }
        setUploading(true);
        setUploadProgress({ current: 0, total: files.length });
        try {
            for (let i = 0; i < files.length; i++) {
                await uploadMainPhoto(files[i]);
                setUploadProgress({ current: i + 1, total: files.length });
            }
            await loadPhotos();
            setFiles([]);
            setPreviews([]);
            if (fileInputRef.current) fileInputRef.current.value = null;
        } catch (err) {
            console.error(err);
            alert('업로드 실패');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async id => {
        if (!window.confirm('삭제하시겠습니까?')) return;
        await deleteMainPhoto(id);
        await loadPhotos();
    };

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = event => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = photos.findIndex(p => p.id === active.id);
        const newIndex = photos.findIndex(p => p.id === over.id);
        const newOrder = arrayMove(photos, oldIndex, newIndex);
        setPhotos(newOrder);
    };

    const handleSaveOrder = async () => {
        try {
            const orderList = photos.map((photo, idx) => ({
                id: photo.id,
                displayOrder: idx + 1
            }));
            await updateMainPhotoOrder(orderList);
            alert('정렬 순서가 저장되었습니다.');
            await loadPhotos();
        } catch (error) {
            console.error(error);
            alert('순서 저장 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">메인 이미지 관리</h1>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
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
                    <p className="text-sm text-gray-400">(최대 100MB)</p>
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

                {uploading && (
                    <div className="text-sm text-gray-600">
                        업로드 중... {uploadProgress.current} / {uploadProgress.total}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={uploading}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    추가
                </button>
            </form>

            <div className="flex justify-end">
                <button
                    onClick={handleSaveOrder}
                    disabled={uploading}
                    className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                >
                    순서 저장
                </button>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToParentElement]}
            >
                <SortableContext
                    items={photos.map(photo => photo.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="overflow-x-auto bg-white rounded-xl shadow">
                        <table className="min-w-full divide-y divide-gray-200 table-auto">
                            <thead className="bg-gray-100">
                            <tr>
                                {['순서', '미리보기', 'URL', '조작'].map((h, idx) => (
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
                            {photos.map(photo => (
                                <SortableRow
                                    key={photo.id}
                                    photo={photo}
                                    onDelete={handleDelete}
                                />
                            ))}
                            </tbody>
                        </table>
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
}
