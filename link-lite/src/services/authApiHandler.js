import { initializeService, errorHandler, getAccessToken } from "./apiServices";


const authApiHandler = {

  async signup(userData) {
    try {
      const service = await initializeService();
      const response = await service.post("/api/register/", userData);
      return response.data;
    } catch (err) {
      errorHandler(err);
    }
  },

  async verifyEmail(token) {
    try {
      const service = await initializeService();
      const response = await service.get(`/api/verify-email?token=${token}`);
      return response;
    } catch (err) {
      errorHandler(err);
    }
  },

  async login(formData) {
    try {
      const service = await initializeService();
      const response = await service.post("/api/login/", formData);
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      const userResponse = await service.get("api/user/");
      localStorage.setItem("user", JSON.stringify(userResponse.data))
      return userResponse.data;
    } catch (err) {
      errorHandler(err);
    }
  },

  async getUserData() {
    const service = await initializeService();
    const token = getAccessToken();
    if (token) {
      try {
        const response = await service.get("/api/user/");
        return response.data;
      } catch (err) {
        errorHandler(err);
      }
    } else {
      console.warn("Aucun token trouvé, redirection vers la connexion");
    }
  },

  async logout() {
    const service = await initializeService();
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        throw new Error("No refresh token found");
      }
      const response = await service.post("/api/logout/", { refresh: refreshToken });  
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      window.location.href = "/login";
      return response;    
    } catch (err) {
      errorHandler(err);
    }
  },
};

export default authApiHandler;
