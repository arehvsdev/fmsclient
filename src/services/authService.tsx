import api from "../api/interceptor";
export const loginUser = (data: any) => {
    return api.post("/auth/login", data);
}

export const registerUser = (data: any) => {
    return api.post("/auth/register", data);
}

export const logoutUser = () => {
    return api.post("/auth/logout");
}

export const getCurrentUser = () => {
    return api.get("/auth/me");
}