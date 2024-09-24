import axios from 'axios';

const getAccessToken = () => localStorage.getItem("access_token");

const service = axios.create({
    baseUrl: process.env.REACT_APP_AUTH_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
      }
});

function errorHandler(error) {
    if(error.response.data) {
        console.error(error.response.data);
        throw error;
    };
    throw error;
}

service.interceptors.request.use((config) => {
    const token = getAccessToken()
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    };
    return config;
});

service.interceptors.response.use(
    (res) => res,
    async (err) => {
        const originalRequest = err.config;
        if(err.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
        };
        try {
            const refreshToken = localStorage.getItem("refresh_token");
            const response = await service.post("/token/refresh/", { refresh: refreshToken});
            localStorage.setItem("access_token", response.data.access);
            service.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
            return service(originalRequest);
        } catch(err) {
            console.error('Le rafraîchissement du token a échoué');
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/login'; 
        };
        return Promise.reject(err);
    }
)

const authApiHandler = {
    service, 

    async signup(userData) {
        try {
            const response = await service.post('/signup/', userData);
            return response.data;
        } catch(err) {
            errorHandler(err);
        };
    },

    async verifyEmail(token) {
        try {
            const response = await axios.get(`/verify-email?token=${token}`);
            return response;      
        } catch (err) {
            errorHandler(err);
        };
    },

    async login(username, password) {
        try {
            const response = await service.post('/login', { username, password });
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            return response.data;
        } catch(err) {
            errorHandler(err)
        };
      },

    async getUserData() {
        try {
            const response = await service.get('/user');
            return response.data;
        } catch(err) {
            errorHandler(err)
        };
      },

    logout() {
        try {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/login';
        } catch(err) {
            errorHandler(err)
        };
      }
}

export default authApiHandler;