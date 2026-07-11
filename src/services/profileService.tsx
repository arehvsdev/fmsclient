import api from "../api/interceptor";


export const userProfile = () => {
    return api.get("/auth/userProfile");
}