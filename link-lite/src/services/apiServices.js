import axios from "axios";

const getAccessToken = () => localStorage.getItem("access_token");

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

function errorHandler(error) {
  if (error.response.data) {
    console.error(error.response.data); // gestion si le user existe deja
    throw error;
  }
  throw error;
}

service.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

service.interceptors.response.use(
  (res) => res,
  
  async (err) => {
    const originalRequest = err.config;
    if (err.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh_token");

      if (!refreshToken) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(err);
      }
      try {
        const response = await service.post("/api/token/refresh/", {
          refresh: refreshToken,
        });
        if (response.status === 200) {
          const newAccessToken = response.data.access;
          localStorage.setItem("access_token", newAccessToken);
          service.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`
          return service(originalRequest);
        } else {
          throw new Error("Échec du rafraîchissement du token");
        }
      } catch (err) {
        console.error("Erreur lors de l'interception :", err.response?.data || err.message);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }
    return Promise.reject(err);
  }
);

export { service, errorHandler, getAccessToken };