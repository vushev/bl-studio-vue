import axios, { AxiosInstance } from 'axios';

class ApiService {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: process.env.VUE_APP_API_ROOT, // Base URL for your API
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    getInstance() {
        return this.axiosInstance;
    }
}

export default new ApiService();
