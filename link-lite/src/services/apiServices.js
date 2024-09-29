import axios from "axios";

const getAccessToken = () => localStorage.getItem("access_token");

// document.cookie = 'sessionid=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
// document.cookie = 'csrftoken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
// localStorage.removeItem('refresh_token');
const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};

const getCsrfToken = async () => {
    try {
        await axios.get('http://localhost:8000/csrf-token/', { 
            withCredentials: true, 
        });        
        const csrfToken = getCookie("csrftoken")
        return csrfToken;
    } catch (error) {
        console.error('Failed to get CSRF token:', error);
        return null;
    }
};

const initializeService = async () => {
  const csrfToken = await getCsrfToken();

  if (!csrfToken) {
    console.error('CSRF token is missing or could not be retrieved.');
    return null;
}

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
  headers: {
    "X-CSRFToken": csrfToken,
    "Content-Type": "application/json",
  },
});


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

      if (originalRequest.url.includes("/api/token/refresh/")) {
        console.error("Refresh token échoué, redirection vers login.");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(err);
      }

      if (!refreshToken) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
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

return service;
};

function errorHandler(error) {
  if (error.response) {
    console.error(error.response); // gestion si le user existe deja
    throw error;
  }
  throw error;
}

export { initializeService, errorHandler, getAccessToken };