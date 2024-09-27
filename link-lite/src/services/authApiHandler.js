import axios from "axios";

const getAccessToken = () => localStorage.getItem("access_token");

const service = axios.create({
  baseURL: process.env.REACT_APP_AUTH_BACKEND_URL,
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
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken && refreshToken === "undefined") {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(err);
      }
      try {
        const response = await service.post("/token/refresh/", {
          refresh: refreshToken,
        });
        if (response.status === 200) {
          const newAccessToken = response.data.access;
          localStorage.setItem("access_token", newAccessToken);
          service.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
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
  }
);

const authApiHandler = {
  service,

  async signup(userData) {
    try {
      const response = await service.post("/register/", userData);
      return response.data;
    } catch (err) {
      errorHandler(err);
    }
  },

  async verifyEmail(token) {
    try {
      const response = await service.get(`/verify-email?token=${token}`);
      return response;
    } catch (err) {
      errorHandler(err);
    }
  },

  async login(formData) {
    try {
      const response = await service.post("/login/", formData);
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      return response.data;
    } catch (err) {
      errorHandler(err);
    }
  },

  async getUserData() {
    const token = getAccessToken();
    if (token) {
      try {
        const response = await service.get("/user/");
        return response.data;
      } catch (err) {
        errorHandler(err);
      }
    } else {
      console.warn("Aucun token trouvé, redirection vers la connexion");
    }
  },

  async logout() {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        throw new Error("No refresh token found");
      }
      await service.post("/logout/", { refresh: refreshToken });
      console.log("loged out");
      
    } catch (err) {
      errorHandler(err);
    }
  },
};

export default authApiHandler;
