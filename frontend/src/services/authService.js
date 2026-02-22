import api from "./api";

const authService = {
  login: async (email, motDePasse) => {
    const response = await api.post("/auth/login", { email, motDePasse });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  isTokenValid: () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000 > Date.now();
    } catch (error) {
      console.error("Erreur validation token:", error);
      return false;
    }
  },

  getProfile: async () => {
    const response = await api.get("/auth/me");
    if (response.data.user) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await api.put("/auth/profile", data);
    if (response.data.user) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  },

  updatePassword: async (ancienMotDePasse, nouveauMotDePasse) => {
    const response = await api.put("/auth/update-password", {
      ancienMotDePasse,
      nouveauMotDePasse,
    });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  },

  uploadPhoto: async (formData) => {
    const response = await api.post("/auth/upload-photo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.data.user) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  },
};

export default authService;
