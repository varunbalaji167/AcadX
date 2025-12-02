// src/utils/adminService.js
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}admin`; // Adjust if your backend URL is different

const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.token;
};

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getDashboardStats = async () => {
  const response = await api.get("/stats");
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const toggleUserBan = async (userId) => {
  const response = await api.put(`/users/${userId}/ban`);
  return response.data;
};

export const getAllItems = async () => {
  const response = await api.get("/items");
  return response.data;
};

export const deleteItemByAdmin = async (itemId) => {
  const response = await api.delete(`/items/${itemId}`);
  return response.data;
};
