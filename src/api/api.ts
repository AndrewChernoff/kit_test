import axios from "axios";
import { LoginType, RegisterType } from "./types";


const instance = axios.create({
    baseURL: 'https://js-test.kitactive.ru/',
  });



export const api = {
    register(body: RegisterType) {
       return instance.post('api/register', body)
    },
    login(body: LoginType) {
       return instance.post('api/login', body)
    },
    logout() {
      return instance.post('api/logout') 
    },
    getMedia() {
      return instance.get('api/media') 
    },
    getMediaItem(id: string) {
      return instance.get(`api/media/${id}`, {responseType: 'blob'}) 
    },
    uploadMedia(body: any) {
      return instance.post('api/media/upload', body) 
    },
}


instance.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem('auth-token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
