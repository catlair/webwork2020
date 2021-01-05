let config = {
    baseURL: 'http://127.0.0.1:9088/',
    timeout: 10000,
};

window._axios = axios.create(config);

//request拦截器
_axios.interceptors.request.use(
    (config) => {
        if (localStorage.getItem('ms_token')) {
            config.headers.Authorization = 'Bearer ' + localStorage.getItem('ms_token');
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

_axios.interceptors.response.use(res => {
    if (res.status === 200 || res.status === 201) {
        return res.data;
    }

    return res;
},err => {
    if (err.response?.status === 401){
        localStorage.removeItem('ms_token');
    }
    return Promise.reject(err);
})
