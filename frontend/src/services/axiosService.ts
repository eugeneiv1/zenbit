import axios from "axios";

const axiosService = axios.create({baseURL:'http://localhost:5050'});

//@ts-ignore
axiosService.interceptors.request.use(request => {
    try {
        const token = localStorage.getItem('accessToken');
        request.headers.Authorization = `Bearer ${token}`;

        return request
    } catch (e) {
        console.log(e);
    }
})

export {
    axiosService
}