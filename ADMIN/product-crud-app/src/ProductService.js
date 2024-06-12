import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // replace with your backend URL

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NDA2NTJhNDU1ZTEzNzQwNTM3MjE2MCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxODEzMjgxMiwiZXhwIjoxNzE4MzkyMDEyfQ.YlkYpVVp0zo02RilvbeUFnr0GH83a9CP7DJGdbUBN40';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: token,
    },
});

axiosInstance.interceptors.request.use((config) => {
    console.log('Requesting:', config);
    return config;
}, (error) => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    console.error('Error response:', error.response);
    return Promise.reject(error);
});

export const getProducts = async () => {
    const response = await axiosInstance.get('/products');
    return response.data;
};

export const getProductById = async (id) => {
    const response = await axiosInstance.get(`/products/find/${id}`);
    return response.data;
};

export const createProduct = async (product) => {
    const response = await axiosInstance.post('/products', product);
    return response.data;
};

export const updateProduct = async (id, product) => {
    const response = await axiosInstance.put(`/products/${id}`, product);
    return response.data;
};

export const deleteProduct = async (id) => {
    await axiosInstance.delete(`/products/${id}`);
};
