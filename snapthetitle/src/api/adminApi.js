// src/api/adminApi.js
import axios from 'axios';

export async function loginAdmin({ username, password }) {
    const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/login`,  // ✅ 절대경로로
        { username, password }
    );
    return data;
}

export const adminClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { 'Content-Type': 'application/json' },
});

// Attach token to every request
adminClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Product APIs
export async function fetchProducts(year) {
    const config = {};
    if (year != null) config.params = { year };
    const { data } = await adminClient.get('/admin/products', config);
    return data;
}
export async function createProduct(product) {
    const { data } = await adminClient.post('/admin/products', product);
    return data;
}
export async function updateProduct(id, product) {
    const { data } = await adminClient.put(`/admin/products/${id}`, product);
    return data;
}
export async function deleteProduct(id) {
    await adminClient.delete(`/admin/products/${id}`);
}

// FAQ APIs
export async function fetchFaqs() {
    const { data } = await adminClient.get('/admin/faqs');
    return data;
}
export async function createFaq(faq) {
    const { data } = await adminClient.post('/admin/faqs', faq);
    return data;
}
export async function updateFaq(id, faq) {
    const { data } = await adminClient.put(`/admin/faqs/${id}`, faq);
    return data;
}
export async function deleteFaq(id) {
    await adminClient.delete(`/admin/faqs/${id}`);
}

// Guide APIs
export async function fetchGuides() {
    const { data } = await adminClient.get('/admin/guides');
    return data;
}
export async function createGuide(guide) {
    const { data } = await adminClient.post('/admin/guides', guide);
    return data;
}
export async function updateGuide(id, guide) {
    const { data } = await adminClient.put(`/admin/guides/${id}`, guide);
    return data;
}
export async function deleteGuide(id) {
    await adminClient.delete(`/admin/guides/${id}`);
}

// Partner APIs
export async function fetchPartners() {
    const { data } = await adminClient.get('/admin/partners');
    return data;
}
export async function createPartner(partner) {
    const { data } = await adminClient.post('/admin/partners', partner);
    return data;
}
export async function updatePartner(id, partner) {
    const { data } = await adminClient.put(`/admin/partners/${id}`, partner);
    return data;
}
export async function deletePartner(id) {
    await adminClient.delete(`/admin/partners/${id}`);
}

// GalleryPhoto CRUD (metadata only)
export async function fetchGalleryPhotos() {
    const { data } = await adminClient.get('/admin/gallery-photos');
    return data;
}
export async function deleteGalleryPhoto(id) {
    await adminClient.delete(`/admin/gallery-photos/${id}`);
}

// GalleryPhoto with files
/**
 * Create gallery photo with metadata and multiple files
 * @param {object} metadata GalleryPhotoDto without attachments
 * @param {File[]} files array of image files
 */
export async function createGalleryPhotoWithFiles(metadata, files) {
    const formData = new FormData();
    formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    files.forEach(file => formData.append('files', file));
    const { data } = await adminClient.post('/admin/gallery-photos', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
}

/**
 * Update gallery photo metadata and upload additional files
 * @param {number|string} id
 * @param {object} metadata updated GalleryPhotoDto without attachments
 * @param {File[]} [files] optional array of new files
 */
export async function updateGalleryPhotoWithFiles(id, metadata, files) {
    const formData = new FormData();
    formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    if (files && files.length) files.forEach(file => formData.append('files', file));
    const { data } = await adminClient.put(`/admin/gallery-photos/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
}

export async function updateGalleryPhotoOrder(orderList) {
    const { data } = await adminClient.put('/admin/gallery-photos/order', orderList, {
        headers: { 'Content-Type': 'application/json' }
    });
    return data;
}

export async function fetchDashboardStats() {
    const { data } = await adminClient.get('/admin/dashboard');
    return data;
}

export async function fetchDashboardCharts() {
    const { data } = await adminClient.get('/admin/dashboard/charts');
    return data;
}

// MainPhoto APIs (메인 슬라이더)
export async function fetchMainPhotos() {
    const { data } = await adminClient.get('/admin/main-photos');
    return data;
}

export async function uploadMainPhoto(file) {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await adminClient.post('/admin/main-photos', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
}

export async function updateMainPhotoOrder(orderList) {
    await adminClient.post('/admin/main-photos/order', orderList, {
        headers: { 'Content-Type': 'application/json' }
    });
}

export async function deleteMainPhoto(id) {
    await adminClient.delete(`/admin/main-photos/${id}`);
}