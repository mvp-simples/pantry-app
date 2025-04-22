import axios from "axios";

const API_URL = "http://192.168.169.197:3001";

export const api = axios.create({
  baseURL: API_URL,
});

export const getItems = () => api.get("/users/1/items");
export const getStats = () => api.get("/users/1/stats");
export const uploadPdf = (formData: FormData) =>
  api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
