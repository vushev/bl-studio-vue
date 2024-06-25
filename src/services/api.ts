import axios from 'axios';

const http = axios.create({
    baseURL: process.env.VUE_APP_API_ROOT,
    headers: {
        'Content-Type': 'application/json',
    },
});

http.interceptors.request.use(
    async req => {
        try {
            // console.log('Sending request:', req);
            const token = localStorage.getItem("token");
            if (token) {
                req.headers["Authorization"] = `Bearer ${token}`;
                console.log('Sending request with token:', token);
            }
        } catch (err) {
            console.error('Request Interceptor Failed', err);
        }
        //TODO add token

        return req;
    },
    err => {
        console.error('Request Interceptor Failed', err);

        return Promise.reject(err);
    }
);

http.interceptors.response.use(
    response => response,
    async err => {
        
        
        if ([401, 403].includes(err?.response?.status)) {
            window.location.href = '/';
            localStorage.removeItem("token");
        }
        if (err?.response) {
            
            if (err.response.status === 403 && err.response.data) {
                return Promise.reject(err.response.data);
            }
        }

        return Promise.reject(err);
    }
);

export default http;