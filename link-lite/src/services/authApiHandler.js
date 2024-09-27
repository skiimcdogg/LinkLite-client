import { service, errorHandler, getAccessToken } from "./apiServices";

const authApiHandler = {
  service,

  async signup(userData) {
    try {
      const response = await service.post("/api/register/", userData);
      return response.data;
    } catch (err) {
      errorHandler(err);
    }
  },

  async verifyEmail(token) {
    try {
      const response = await service.get(`/api/verify-email?token=${token}`);
      return response;
    } catch (err) {
      errorHandler(err);
    }
  },

  async login(formData) {
    try {
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
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        throw new Error("No refresh token found");
      }
      await service.post("/api/logout/", { refresh: refreshToken });      
    } catch (err) {
      errorHandler(err);
    }
  },
};

export default authApiHandler;
