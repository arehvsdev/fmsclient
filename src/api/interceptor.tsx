import api from "./axios";

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && window.location.pathname !== "/login") {
      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

export default api;