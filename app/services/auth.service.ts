import axiosInstance from "@/http/axios";

export const loginService: any = async (data: object) => {
    return axiosInstance.post(`/auth`, data).then(res => res.data).catch(err => null);
}

