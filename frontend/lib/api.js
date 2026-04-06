import axios from "axios";

// Centraliza a comunicacao com a API.
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Antes de cada chamada, pega o token salvo no navegador.
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

export function saveToken(token) {
  // Salva o token no navegador para usar depois.
  localStorage.setItem("token", token);
  setAuthToken(token);
}

export function clearToken() {
  // Remove o token quando o usuario sair ou quando ele for invalido.
  localStorage.removeItem("token");
  setAuthToken(null);
}

export default api;
